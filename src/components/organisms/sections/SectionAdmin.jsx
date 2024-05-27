const SectionAdmin = ({ title, type, ContainerComponent }) => {
  
  return (
    <>
      <section className='w-full h-fit grid p-section g-15'>
        <ContainerComponent title={title} type={type} />
      </section>
    </>
  )
}

export default SectionAdmin