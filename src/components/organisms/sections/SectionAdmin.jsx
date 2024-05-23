const SectionAdmin = ({ title, ContainerComponent }) => {
  return (
    <>
      <section className='w-full p-section'>
        <h1 className="txt-accent bigtitle"><strong>{title}</strong></h1>
        <ContainerComponent/>
      </section>
    </>
  )
}

export default SectionAdmin