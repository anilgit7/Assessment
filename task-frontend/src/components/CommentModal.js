import axios from "axios";
import React, { useState, useEffect } from "react";
import { handleResponse, toastError, toastSuccess } from "../utils/toastr";
import {
  faHomeLgAlt,
  faPeopleCarryBox,
} from "@fortawesome/free-solid-svg-icons";

const CommentModal = ({ 
  isOpen,
  setIsOpen,
  getData,
  editTitle,
  isEdit,
  editContent,
  editId,
  setIsEdit,
  userId
}) => {
  console.log(editTitle);
  const [title, setTitle] = useState(editTitle || "");
  const [content, setContent] = useState(editContent || "");

  useEffect(() => {
     if (isOpen) {
          if (isEdit) {
            setTitle(editTitle || "");
            setContent(editContent || "");
          } else {
            setTitle(""); 
            setContent("");
          }
        }
  }, [editTitle, editContent, isEdit,isOpen]);
  const handleCancel = () => {
     setIsOpen(false);
     setIsEdit(false);  
     setTitle("");     
     setContent("");
  };
  console.log("new title==>");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("title:", title, "content:", content);
    if (!title.trim() && !content.trim()) {
      toastError("Please enter the title");
      toastError("Please enter content");
      return;
    } else if (!title.trim()) {
      toastError("Please enter the title");
      return;
    } else if (!content.trim()) {
      toastError("Please enter content");
      return;
    }
    if (isEdit === true) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/comments/edit/${editId}`,
          { title, content }
        );

        if (response.status === 200) {
          toastSuccess("Comment updated successfully!");
          getData();
          setTitle('');
          setContent('');
          setIsOpen(false);
          setIsEdit(false);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        toastError("Error while adding");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/comments",
          { title, content, userId }
        );
        if (response.status === 201) {
             getData();
             setTitle("");
             setContent("");
          // Update the parent component's state
          setIsOpen(false);
          toastSuccess("Comment Added Successfully!!!");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        toastError("Error while adding");
      }
    }
  };
  return (
    <>
      <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center ">
        <div className="commentBox bg-white px-10 py-10 border-1 border-gray-200 rounded-l">
          <div>
            <span className="font-bold text-xl">
              {isEdit ? "Edit Comment" : "Add Comment"}
            </span>
          </div>
          <hr className="border-gray-300 mt-2"></hr>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[500px]">
              <input
                type="text"
                placeholder="enter topic"
                id="additem"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-2 py-1 mt-7 border rounded w-full text-gray-700"
              />
              {toastError && (
                <p className="text-red-500 text-sm mt-1 ">{toastError}</p>
              )}
              <textarea
                type="text"
                placeholder="enter description"
                className="px-2 py-1 mt-5 border rounded w-full text-gray-700"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {toastError && (
                <p className="text-red-500 text-sm mt-1 ">{toastError}</p>
              )}
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="border py-1 px-2 w-[80px] rounded-sm font-semibold text-white bg-gray-600 mr-3 cursor-pointer hover:bg-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="border py-1 px-2 w-[80px] rounded-sm font-semibold text-white bg-blue-600 cursor-pointer hover:bg-blue-500"
                type="submit"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CommentModal;
