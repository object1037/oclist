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
    <div className='max-w-4xl mx-auto'>
      <h3 className='text-2xl font-semibold mb-6'>Class start times</h3>
      <SettingForm data={data} />
    </div>
  )
}

export default Setting