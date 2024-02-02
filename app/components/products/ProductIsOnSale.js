const ProductIsOnSale = ({ onSale, percentageOff }) => {
  if (onSale === 'sale')
    return <h2 className='text-error uppercase'>Limited Time Sale</h2>
  if (onSale === 'clearance')
    return (
      <h2 className='text-primary uppercase'>
        {percentageOff >= 20 ? (
          <>{`Clearance  ${percentageOff}% off`} </>
        ) : (
          <> On Clearance</>
        )}
      </h2>
    )

  return <h2 className='text-transparent uppercase'>no</h2>
}

export default ProductIsOnSale
