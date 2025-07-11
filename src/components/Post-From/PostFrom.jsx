import React, { useCallback, useEffect, useState } from "react"; 
import { useForm } from "react-hook-form";
import { Button, Input, Selected, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";

export default function PostForm({ post }) {

const  [isSubmitting , setIsSubmitting] = useState(false)
const [previewUrl, setPreviewUrl] = useState(null);


  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
 defaultValues: {
  title: post?.title || "",
  content: post?.content || "",
  slug: post?.slug || "",
  status: post?.status || "active",
  category: post?.category || "All",
},

  });

  const categories = [
     "All",
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Entertainment",
  "Finance",
  "Education",
  ];




  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const submit = async (data) => {
    setIsSubmitting(true)
  console.log("Form submit data:", data);
    try {
      if (post) {
        // Updating existing post
        const file =
          data.featuredImage && data.featuredImage[0]
            ? await service.uploadFile(data.featuredImage[0])
            : null;

        if (file) {
          await service.deltefile(post.featuredImage);
        }

        const updatedPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // Creating new post
        const file =
          data.featuredImage && data.featuredImage[0]
            ? await service.uploadFile(data.featuredImage[0])
            : null;

        if (file) {
               const fileId = file.$id;
          data.featuredImage = fileId
          console.log(userData);
     const newPost = await service.createPost({
  ...data,
  userId: userData.$id,
   authorName: userData.name,
});


          if (newPost) {
            navigate(`/post/${newPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      // Optionally, show error to user here
    } finally {
      setIsSubmitting(false)
    }
  };

  const SlugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
       setValue("slug", SlugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, SlugTransform, setValue]);


React.useEffect(() => {
  if (post?.featuredImage) {
    service.getFilepreview(post.featuredImage).then((url) => {
      if (url) setPreviewUrl(url);
    });
  }
}, [post]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row flex-wrap gap-6 justify-center items-center "
      noValidate
    >
      {/* Left side inputs */}
      <div className="w-full lg:w-2/3 px-2 space-y-6">
        <div>
          <Input
            label="Title"
            placeholder="Enter Post Title"
            className="mb-1"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Slug"
            placeholder="Enter Post Slug"
            className="mb-1"
            {...register("slug", { required:  false })}
          />
          {errors.slug && (
            <p className="text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>

        <div>
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            
          />
        </div>
      </div>

      {/* Right side inputs */}
      <div className="w-full lg:w-1/3 px-2 space-y-6 flex items-center flex-col  ">
        <div>
          <Input
            label="Featured Image"
            type="file"
            className="mb-1"
            accept="image/png, image/jpg, image/jpeg"
            {...register("featuredImage", { required: !post })}
          />
          {errors.featuredImage && (
            <p className="text-sm text-red-600">
              Featured image is required for new posts.
            </p>
          )}
        </div>

        {/* Existing image preview */}
            {previewUrl && (
              <div className="w-full mb-4">
                <img
                  src={previewUrl}
                  alt={post?.title || "Post image"}
                  className="w-full h-auto rounded-xl border object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x200?text=No+Image";
                  }}
                />
              </div>
            )}


        <div>
          <Selected
            label="Select Category"
            options={categories}
            className="mb-1"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

       <Button 
          type="submit" 
          className="w-50 h-10 rounded-lg flex items-center justify-center gap-2" 
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
          )}
          {isSubmitting 
            ? (post ? "Updating..." : "Creating...") 
            : (post ? "Update Post" : "Create Post")
          }
        </Button>
      </div>
    </form>
  );
}