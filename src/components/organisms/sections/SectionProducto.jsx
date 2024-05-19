const SectionProducto = ({ data, Component, sectionClass = '', containerClass }) => {
  return (
    <section className={`grid place-items-center ${sectionClass}`}>
      <div className={`w-full max-w-screen-xl ${containerClass}`}>
        <Component data={data} />
      </div>
    </section>
  )
}

export default SectionProducto