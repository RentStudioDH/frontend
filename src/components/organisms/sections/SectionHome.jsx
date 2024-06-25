const SectionHome = ({ title, ContainerComponent, background = '', containerClass }) => {
  return (
    <section className={`grid place-items-center ${background}`}>
      <div className={`w-full max-w-screen-xl ${containerClass} g-15 p-section`}>
        <ContainerComponent title={title}/>
      </div>
    </section>
  )
}

export default SectionHome


