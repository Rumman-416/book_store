import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Components/Spinner";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const bookDeleteHandler = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/books/${id}`)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar("book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You Want To Delete This Book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={bookDeleteHandler}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
