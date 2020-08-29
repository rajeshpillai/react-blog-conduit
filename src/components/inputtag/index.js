import React, {useState, useEffect} from 'react';


const tagStyle  = {
  display: "inline-block",
  backgroundColor: "yellow",
  fontSize: "0.9em",
  margin: "5px",
  border: "1px solid lightblue",
  padding: "2px",
  cursor: "pointer"
}


const cStyle = {
  position: "relative",
  display: "inline-block",
  width: "300px",
  border: "1px solid lightblue",
  overflow: "auto"
}

const iStyle = {
  display: "inline-block",
  fontSize: "0.9em", 
  margin: "5px",
  width: "90%",
  border: "0"
}


export default function InputTag({defaultTags, onAddTag, 
    onDeleteTag, placeholder}) {
  
  // Local state
  const [tags, setTags] = useState([]);


  useEffect(() => {
    console.log("defaultTags: ", defaultTags);
    setTags(defaultTags.split(","));
  }, [defaultTags])

  const onKeyUp = (e) => {
    e.preventDefault();
    //alert(e.keyCode);
    // 13 - enter and 188 for comma
    if (e.keyCode == 188) {
      let input = e.target.value.trim().split(",");
      if (input.length == 0 || input[0] == "") return;
      onAddTag(input[0]);
      e.target.value = "";
    }
  }

  return (
    <div style={cStyle}>
        <TagList tags={tags}
            onDeleteTag = {onDeleteTag} />
        <input 
          onKeyUp = {e => onKeyUp(e)}
          style={iStyle}
          type="text"
          placeholder ={placeholder}>
          </input>
    </div>
  )
}

function TagList({tags, onDeleteTag}) {
  const tagsUI = tags.map(tag => {
    return (
    <Tag 
        onDeleteTag={()=> onDeleteTag(tag)}
        key={tag} 
        value={tag}
        />
    )
  })
  return (
    <div className="tag-list">
      {tagsUI}
    </div>
  )
}

function Tag({onDeleteTag, value}) {
  let tag = (
    <div style={{display:"inline-block"}}>
       <span 
         onClick={e => onDeleteTag(e, value)}
         style={tagStyle}>
         &#x2716; {" "}{value}
       </span>
    </div>
  )

  return(
    tag
  )
}