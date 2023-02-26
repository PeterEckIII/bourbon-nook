import { Form, Link } from "@remix-run/react";
import TextInput from "~/components/UI/Inputs/TextInput";
import TextareaInput from "~/components/UI/Inputs/TextareaInput";
import type { SettingErrors, RedisFormData } from "~/utils/types";
import Button from "~/components/UI/Button";

type SettingFormProps = {
  data: RedisFormData | null;
  errors: SettingErrors | null;
};

export default function SettingForm({ data, errors }: SettingFormProps) {
  return (
    <div className="m-4 w-full rounded-xl bg-white p-6">
      <Form method="post">
        <input type="hidden" name="redisId" value={data?.redisId} />
        <input type="hidden" name="bottleId" value={data?.bottleId} />
        <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
          <div className="mb-2 w-full pr-2 md:mb-0 lg:w-1/2 xl:w-1/3">
            <TextInput
              name="date"
              labelName="Date"
              type="text"
              defaultValue={data?.date}
              error={errors?.date}
            />
          </div>
          <div className="mb-2 w-full pr-2 md:mb-0 lg:w-1/2 xl:w-1/3">
            <TextInput
              name="glassware"
              labelName="Glassware"
              type="text"
              defaultValue={data?.glassware}
              error={errors?.glassware}
            />
          </div>
          <div className="mb-2 w-full md:mb-0 lg:w-1/2 xl:w-1/3">
            <TextInput
              name="restTime"
              labelName="Rest Time"
              type="text"
              defaultValue={data?.restTime}
              error={errors?.restTime}
            />
          </div>
          <div className="mb-2 w-full md:mb-0">
            <TextInput
              name="setting"
              labelName="Setting"
              type="text"
              defaultValue={data?.setting}
              error={errors?.setting}
            />
          </div>
          <TextareaInput
            name="nose"
            labelName="Nose"
            defaultValue={data?.nose}
            error={errors?.nose}
          />
          <TextareaInput
            name="palate"
            labelName="Palate"
            defaultValue={data?.palate}
            error={errors?.palate}
          />
          <TextareaInput
            name="finish"
            labelName="Finish"
            defaultValue={data?.finish}
            error={errors?.finish}
          />
          <TextareaInput
            name="thoughts"
            labelName="Thoughts"
            defaultValue={data?.thoughts}
            error={errors?.thoughts}
          />
        </div>
        <div className="space-between flex w-full">
          <div>
            <Link to={`/tester/new/bottle?rid=${data?.redisId}`}>
              <Button callToAction="Back" type="button" />
            </Link>
          </div>
          <div>
            <Button callToAction="Submit" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  );
}
