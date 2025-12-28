import {useForm, SubmitHandler} from 'react-hook-form';
import { Label } from '../ui/label';
import { UpdatePreferredName } from '@/lib/db/user';

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
      <Label>PreferredName</Label>
      <input defaultValue={preferredName || ''} placeholder='Your preferredName' {...register("preferredName")} />

      {/* include validation with required or other standard HTML validation rules */}
      {/* errors will return when field validation fails  */}

      <button type="submit">Submit</button>
    </form>
  )
}

export default UserSettingsForm
