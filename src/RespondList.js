
import React from "react";

function RespondList(props) {
  if (props.children.length > 0) {
    const respondList = props.children.map(respond => (
      <li key={respond.commentID}>
        <p>{respond.description}</p>
      </li>
    ));

    return <ul className="respond-list">{respondList}</ul>;
  }

  return null;

}export default RespondList;

//function RespondList(props){
//    if(props.children.length > 0){
//        const respondList = props.children.map(respond =>
//            <li key = {respond.commentID}>
//                <p>{respond.description}+"\n"</p>
//            </li>
//        );
//        return respondList;
//    }
//}export default RespondList;