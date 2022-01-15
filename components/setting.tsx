import SettingForm from './settingForm'

const Setting = ({
  data
}: {
  data: account[] | undefined
}) => {
  if (!data) {
    return (
      <div className="flex justify-center">Loading...</div>
    )
  }
  return (
    <div className='mx-6'>
      <SettingForm data={data} />
    </div>
  )
}

export default Setting