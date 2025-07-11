import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  control,
  name,
  defaultValue ,
  label = ""
}) {
  return (
    <div className="w-full">
        {label && <label className="text-sm font-semibold mb-2">{label}</label>}
 
 <Controller
 name={name || "content"}
 control={control}

 render={({ field: { onChange, value } }) => (
   <Editor
    apiKey="14zfw8f78114xtr86ckawmlflurjisz7e1a648wxfid1hi6n"
   initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 700,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
   />
)}
 />
 
 
 
 
 
 
 
    </div>
  )
 

}