import {useForm, SubmitHandler} from 'react-hook-form';
import { Label } from '../ui/label';
import { UpdatePreferredName } from '@/lib/db/user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Field, FieldGroup } from '../ui/field';

type Inputs = {
    preferredName: string | null,
    userId: string
}

const UserSettingsForm = ({preferredName, userId}: Inputs) => {
     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await UpdatePreferredName({userId: userId, updatedName: data.preferredName || ''});
    console.log("Name updated successfully")
}

  return (
     <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Field>
      <Label>PreferredName</Label>
      <Input defaultValue={preferredName || ''} placeholder='Your preferredName' {...register("preferredName")} />
      </Field>

      {/* include validation with required or other standard HTML validation rules */}
      {/* errors will return when field validation fails  */}

      <Button type="submit">Submit</Button>
    </form>
  )
}

export default UserSettingsForm
