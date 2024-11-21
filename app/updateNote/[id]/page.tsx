import { getNoteData } from "../actions";
import Form from "next/form";
import { updateForm } from "./updateAction";

interface props {
  params: { id: string };
}

const page = async ({ params }: props) => {
  let title: string = "";
  let content: string = "";
  let category: string = "";

  const data = await getNoteData(params.id);
  title = data?.note.data.title;
  content = data?.note.data.content;
  category = data?.note.data.category;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form
        action={updateForm}
        className="flex flex-col w-96 border-2 gap-5 p-4 rounded-md "
      >
        <input type="hidden" name="id" defaultValue={data?.note.data._id} />
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="p-2 border-2 rounded-md"
          defaultValue={data?.note.data.title}
        />
        <input
          name="content"
          type="text"
          placeholder="Content"
          className="p-2 border-2 rounded-md"
          defaultValue={content}
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          className="p-2 border-2 rounded-md"
          defaultValue={category}
        />
        <button type="submit" className="p-3 bg-black text-white rounded-md">
          Update
        </button>
      </Form>
    </div>
  );
};

export default page;
