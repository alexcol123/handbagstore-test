export const truncateText = (str, desireLength = 25) => {



  if (str.length <  desireLength ) {
    return str
  }
   return str.substring(0, desireLength) + '...'

}
