import Logo from '../../assests/logo.png'

function Brand({
  imageClassName = 'h-20',
  textClassName = 'text-3xl',
  className = 'p-6',
}) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <img src={Logo} alt='Quantum Logo' className={`${imageClassName}`} />
      <div className={`ml-4 font-roboto ${textClassName}`}>
        Quantum-Academy
      </div>
    </div>
  )
}

export default Brand