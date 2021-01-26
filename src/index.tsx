import * as React from "react";
import { render } from "react-dom";
import {TreeView, TreeItem, TreeItemProps, TreeViewProps} from "@material-ui/lab"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function TreeItemX(props:TreeItemProps &{iconClickOnly:boolean}){
  // todo should call the original
  const handler:TreeItemProps['onLabelClick'] = evt => evt.preventDefault();
  const {iconClickOnly,...others} = props;
  const handledProps:TreeItemProps ={
    ...others,
    [props.iconClickOnly?'onLabelClick':'onIconClick']:handler
  }
  return <TreeItem {...handledProps} />
}
function TreeViewX(props:TreeViewProps&{defaultPreventedPrevents:boolean}){
  const {defaultPreventedPrevents,...others} = props;
  const originalOnNodeSelect = props.onNodeSelect;
  const preventingOnNodeSelect = (evt:React.ChangeEvent<{}>, nodeId:string&string[]) => {
    if(defaultPreventedPrevents){
      if(!evt.defaultPrevented){
        originalOnNodeSelect?.(evt,nodeId)
      }
    }else{
      if(evt.defaultPrevented){
        originalOnNodeSelect?.(evt,nodeId)
      }
    }
    
  }
  
  return <TreeView {...others} onNodeSelect={preventingOnNodeSelect}/> 

}

function App(){
  const [selected,setSelected] = React.useState<string>('')

  return (
    <TreeViewX 
      defaultPreventedPrevents={true}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />} 
      selected={selected} 
      onNodeSelect={(_,id)=>{
        setSelected(id);
      }}>
      <TreeItemX iconClickOnly nodeId='parent' label='Parent'>
        <TreeItemX iconClickOnly nodeId='child' label='Child'/>
      </TreeItemX>
    </TreeViewX>
  );
  
}

render(<App />, document.getElementById("root"));
