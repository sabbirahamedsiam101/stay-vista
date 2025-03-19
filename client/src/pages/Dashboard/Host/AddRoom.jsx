import React, { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function AddRoom() {
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Image Upload");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const { user } = useAuth();

  const dateHandler = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (foromData) => {
      const { data } = await axiosSecure.post("/rooms", foromData);
      return data;
    },
    onSuccess: () => {
      console.log("room added successfully");
      toast.success("Room added successfully");
      setLoading(false);
      navigate("/dashboard/my-listings");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const location = form.location.value;
    const title = form.title.value;
    const category = form.category.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const host = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    };

    try {
      const imageUrl = await imageUpload(image);
      const roomData = {
        location,
        title,
        category,
        from,
        to,
        price,
        guests,
        bathrooms,
        bedrooms,
        description,
        image: imageUrl,
        host,
      };
      console.log(roomData);

      // send the room data to the server
      await mutateAsync(roomData);
    
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* add room  */}
      <AddRoomForm
        dates={dates}
        dateHandler={dateHandler}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </div>
  );
}

export default AddRoom;
