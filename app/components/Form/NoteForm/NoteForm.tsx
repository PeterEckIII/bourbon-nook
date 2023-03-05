import { Form, Link } from "@remix-run/react";
import type { NoteErrors, RedisFormData } from "~/utils/types";
import EarthNotes from "~/components/Notes/EarthNotes";
import FruitNotes from "~/components/Notes/FruitNotes";
import SpiceNotes from "~/components/Notes/SpiceNotes";
import SweetNotes from "~/components/Notes/SweetNotes";
import GrainNotes from "~/components/Notes/GrainNotes";
import Rating from "~/components/Notes/Rating";
import Button from "~/components/UI/Button";

type NoteFormProps = {
  data: RedisFormData | null;
  errors: NoteErrors | null;
};

export default function NoteForm({ data, errors }: NoteFormProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="w-full max-w-xl">
        <input type="hidden" name="redisId" value={data?.redisId} />
        <input type="hidden" name="bottleId" value={data?.bottleId} />
        <EarthNotes data={data} errors={errors} />
        <FruitNotes data={data} errors={errors} />
        <SpiceNotes data={data} errors={errors} />
        <SweetNotes data={data} errors={errors} />
        <GrainNotes data={data} errors={errors} />
        <Rating data={data} errors={errors} />
        <div className="flex justify-between">
          <div>
            <Link to={`/reviews/new/setting?rid=${data?.redisId}`}>
              <Button type="button" callToAction="Back" />
            </Link>
          </div>
          <div>
            <Button type="submit" callToAction="Review" />
          </div>
        </div>
      </Form>
    </div>
  );
}
