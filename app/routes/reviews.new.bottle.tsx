import { conform, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { redirect, json, type ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  // useNavigate,
  useNavigation,
} from "@remix-run/react";

import Dropdown from "~/components/Dropdown/Dropdown";
import Input from "~/components/Input/Input";
import { createBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { bottleSchema, handleSubmission } from "~/utils/conform";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const userId = await requireUserId(request);

//   const { result, submission } = await handleSubmission(request, bottleSchema);

//   if (!submission.value || submission.intent !== "submit") {
//     return json(submission);
//   }
//   const bottle = await createBottle({
//     userId,
//     name: result.name,
//     type: result.type,
//     status: result.status,
//     distiller: result.distiller,
//     producer: result.producer,
//     country: result.country,
//     region: result.region,
//     price: result.price,
//     age: result.age,
//     year: result.year,
//     batch: result.batch,
//     barrel: result.barrel,
//     alcoholPercent: result.alcoholPercent,
//     proof: result.proof,
//     size: result.size,
//     color: result.color,
//     finishing: result.finishing,
//     imageUrl: result.imageUrl,
//     openDate: result.openDate,
//     killDate: result.killDate,
//   });

//   return redirect(`/bottles/new/settings?bid=${bottle.id}`);
// };

// export default function NewReviewBottle() {
//   const navigation = useNavigation();
//   // const navigate = useNavigate();
//   const lastSubmission = useActionData<typeof action>();

//   const [
//     form,
//     {
//       name,
//       type,
//       distiller,
//       producer,
//       country,
//       region,
//       price,
//       age,
//       year,
//       batch,
//       barrel,
//       alcoholPercent,
//       proof,
//       size,
//       color,
//       finishing,
//       imageUrl,
//       openDate,
//       killDate,
//     },
//   ] = useForm({
//     lastSubmission,
//     onValidate({ formData }) {
//       return parse(formData, { schema: bottleSchema });
//     },
//     shouldValidate: "onBlur",
//     shouldRevalidate: "onBlur",
//   });

//   return (
//     <Form
//       {...form.props}
//       method="POST"
//       className="m-4 p-2 flex flex-col max-w-[1000px]"
//     >
//       <Input
//         {...conform.input(name)}
//         error={name.error}
//         label="Bottle Name"
//         placeholder="Buffalo Trace, George T Stagg"
//         navigationState={navigation.state}
//       />
//       <Dropdown
//         options={[
//           { value: "OPENED", label: "Opened" },
//           { value: "CLOSED", label: "Closed" },
//           { value: "FINISHED", label: "Finished" },
//         ]}
//         label="Bottle Status"
//         id="bottle-status"
//         initialValue={{ value: "CLOSED", label: "Closed" }}
//       />
//       <Input
//         {...conform.input(type)}
//         error={type.error}
//         label="Sprit Type"
//         placeholder="Bourbon, Rye, Scotch..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(distiller)}
//         error={distiller.error}
//         label="Distillery"
//         placeholder="Jack Daniels, MGP, Woodford Reserve..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(producer)}
//         error={producer.error}
//         label="Producer"
//         placeholder="MGP, Sazerac, Brown Foreman..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(country)}
//         error={country.error}
//         label="Country of Origin"
//         placeholder="USA, Scotland, Japan, India..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(region)}
//         error={region.error}
//         label="Region"
//         placeholder="KY, Islay, Barbados..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(price)}
//         error={price.error}
//         label="Price"
//         placeholder="34.95"
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(age)}
//         error={age.error}
//         label="Age"
//         placeholder="12yrs, 7yr 5mos, NAS..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(year)}
//         error={year.error}
//         label="Year Released"
//         placeholder="2019"
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(batch)}
//         error={batch.error}
//         label="Batch"
//         placeholder="B921, Batch 2, Country Ham..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(barrel)}
//         error={barrel.error}
//         label="Barrel #"
//         placeholder="22, A5JG5231..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(alcoholPercent)}
//         error={alcoholPercent.error}
//         label="ABV"
//         placeholder="58.9%"
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(proof)}
//         error={proof.error}
//         label="Proof"
//         placeholder="115"
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(size)}
//         error={size.error}
//         label="Size"
//         placeholder="750mL, 1.75L, 2oz..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(color)}
//         error={color.error}
//         label="Color"
//         placeholder="Amber, Tawny, Golden..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(finishing)}
//         error={finishing.error}
//         label="Finishing Barrels"
//         placeholder="Cabernet, Barbados Rum, Ex-Scotch..."
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(imageUrl)}
//         error={imageUrl.error}
//         label="Bottle Image"
//         placeholder=""
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(openDate)}
//         error={openDate.error}
//         label="Bottle opened on"
//         placeholder=""
//         navigationState={navigation.state}
//       />
//       <Input
//         {...conform.input(killDate)}
//         error={killDate.error}
//         label="Bottle finished on"
//         placeholder=""
//         type="text" className="block px-4 py-2 mx-4 my-2 outline-none"
//         navigationState={navigation.state}
//       />
//       <button
//         type="submit"
//         className="mx-3 my-1 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
//       >
//         Create
//       </button>
//     </Form>
//   );
// }

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const fd = await request.formData();
  const submission = parse(fd, { schema: bottleSchema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  try {
    const bottle = await createBottle({
      userId,
      name: submission.value?.name,
      type: submission.value?.type,
      status: "OPENED",
      distiller: submission.value?.distiller,
      producer: submission.value?.producer,
      country: submission.value?.country,
      region: submission.value?.region,
      price: submission.value?.price,
      age: submission.value?.age,
      year: submission.value?.year,
      batch: submission.value?.batch,
      barrel: submission.value?.barrel,
      alcoholPercent: submission.value?.alcoholPercent,
      proof: submission.value?.proof,
      size: submission.value?.size,
      color: submission.value?.color,
      finishing: submission.value?.finishing,
      imageUrl: submission.value?.imageUrl,
      openDate: submission.value?.openDate,
      killDate: submission.value?.killDate,
    });

    return redirect(`reviews/new/setting?bid=${bottle.id}`);
  } catch (error) {
    return json(submission);
  }
};

export default function NewReviewBottle() {
  const lastSubmission = useActionData<typeof action>();
  const [
    form,
    {
      name,
      type,
      // status,
      distiller,
      producer,
      country,
      region,
      price,
      age,
      year,
      batch,
      barrel,
      alcoholPercent,
      proof,
      size,
      color,
      finishing,
      imageUrl,
      openDate,
      killDate,
    },
  ] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: bottleSchema });
    },
  });

  return (
    <Form {...form.props} method="POST">
      <label htmlFor="name">name</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="name"
        {...conform.input(name)}
      />
      {/* <select id="status" {...conform.select(status)}>
        <option value="CLOSED">Closed</option>
        <option value="OPENED">Opened</option>
        <option value="FINISHED">Finished</option>
      </select> */}
      <label htmlFor="type">type</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="type"
        {...conform.input(type)}
      />
      <label htmlFor="distiller">distiller</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="distiller"
        {...conform.input(distiller)}
      />
      <label htmlFor="producer">producer</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="producer"
        {...conform.input(producer)}
      />
      <label htmlFor="country">country</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="country"
        {...conform.input(country)}
      />
      <label htmlFor="region">region</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="region"
        {...conform.input(region)}
      />
      <label htmlFor="price">price</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="price"
        {...conform.input(price)}
      />
      <label htmlFor="age">age</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="age"
        {...conform.input(age)}
      />
      <label htmlFor="year">year</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="year"
        {...conform.input(year)}
      />
      <label htmlFor="batch">batch</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="batch"
        {...conform.input(batch)}
      />
      <label htmlFor="barrel">barrel</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="barrel"
        {...conform.input(barrel)}
      />
      <label htmlFor="alcoholPercent">alcoholPercent</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="alcoholPercent"
        {...conform.input(alcoholPercent)}
      />
      <label htmlFor="proof">proof</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="proof"
        {...conform.input(proof)}
      />
      <label htmlFor="size">size</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="size"
        {...conform.input(size)}
      />
      <label htmlFor="color">color</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="color"
        {...conform.input(color)}
      />
      <label htmlFor="finishing">finishing</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="finishing"
        {...conform.input(finishing)}
      />
      <label htmlFor="imageUrl">imageUrl</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="imageUrl"
        {...conform.input(imageUrl)}
      />
      <label htmlFor="openDate">openDate</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="openDate"
        {...conform.input(openDate)}
      />
      <label htmlFor="killDate">killDate</label>
      <input
        type="text"
        className="block px-4 py-2 mx-4 my-2 outline-none"
        id="killDate"
        {...conform.input(killDate)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 my-4">
        Submit
      </button>
    </Form>
  );
}
