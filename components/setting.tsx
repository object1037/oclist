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
    <SettingForm data={data} />
  )
}

export default Setting