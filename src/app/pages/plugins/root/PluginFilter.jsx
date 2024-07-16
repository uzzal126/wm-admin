
const PluginFilter = () => {
  return (
    <form className='plugin-filter bg-white'>
      <div className="plugin-filter--list">
        <label htmlFor="all">
          <input
            id="all"
            value="All"
            type="radio"
            name="plugin"
          />
          All
        </label>
        <label htmlFor="delivery">
          <input
            id="delivery"
            value="Delivery"
            type="radio"
            name="plugin"
          />
          Delivery
        </label>
        <label htmlFor="carrier">
          <input
            id="carrier"
            value="Carrier"
            type="radio"
            name="plugin"
          />
          Carrier
        </label>
      </div>
    </form>
  )
}

export default PluginFilter;
