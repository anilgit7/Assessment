import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import mountain from "../assets/images/mountain.webp";
import { handleResponse, toastError, toastSuccess } from "../utils/toastr";
import CommentModal from "../components/CommentModal";
import { logoutUser, checkAuth } from "../api/auth";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Dashboard() {
  const [comment, setComment] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    getData();
    checkId();
  }, []);
  const checkId = async () => {
    try {
      const data = await checkAuth();

      setUserId(data.id);
    } catch (error) {
      setUserId(null);
    }
  };
  
  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/comments`);
      setComment(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/comments/${id}`);
      setComment((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
      toastSuccess("Comment deleted successfully");
    } catch (error) {
      toastError("Error while deleting");
      console.error("Error fetching comments:", error);
    }
  };
  const handleEdit = async (id) => {
    setEditId(id);
    try {
      const response = await axios.get(
        `${BASE_URL}/comments/${id}/edit`
      );
      console.log("Comment data:", response.data.title);
      setEditTitle(response.data.title);
      setEditContent(response.data.content);
      setIsOpen(true);
      setIsEdit(true);
    } catch (error) {
      toastError("Error while Editing");
      console.error("Error fetching comments:", error);
    }
  };
  return (
    <>
      <div className="container p-7 border border-gray-400 h-[600px] rounded-sm w-[800px] m-auto mt-[40px] bg-white">
        <div className="icon flex">
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl" />
          <span className="flex items-center ms-2 font-semibold">Anil</span>
        </div>
        <div className="ms-10">
          <img
            src={mountain}
            alt="hero of login page"
            className="w-full h-[100px]"
          />
          <hr className=" my-5 border-gray-300" />
          <div className="flex justify-between">
            <div className="flex">
              <h2>Comments </h2>
              <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-0.5 rounded-full h-[25px] ms-[10px]">
                {comment.length}
              </span>
            </div>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-600 text-white cursor-pointer hover:bg-blue-500 rounded"
            >
              Add comment
            </button>
          </div>
          <hr className=" my-5 border-gray-300" />
        </div>
        {comment.length === 0 ? (
          <p className="ms-10 text-gray-500">No comments added...</p>
        ) : (
          <div className="ms-10 max-h-[250px] overflow-y-auto">
            {comment.map((item, index) => (
              <div className="flex justify-between ">
                <div className="comments mt-[20px]" key={index}>
                  <div className="title font-bold">{item.title}</div>
                  <div className="content">{item.content}</div>
                </div>
                {userId === item.user_id ? (
                  <div className="flex justify-end mr-5">
                    <div
                      className="my-auto mr-4 cursor-pointer"
                      onClick={() => handleEdit(item.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div
                      className="my-auto cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <CommentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editTitle={editTitle}
          isEdit={isEdit}
          editContent={editContent}
          editId={editId}
          getData={getData}
          setIsEdit={setIsEdit}
          userId={userId}
        />
      )}
    </>
  );
}

export default Dashboard;
