import React, { Component } from 'react'

 class Footer extends Component {
  render() {
    return (
      <div>
        <div style={styles.footer}>
            <div>
                Copyright &#169; 2022 - L00171275@atu.ie
            </div>
        </div>
      </div>
    )
  }
}
const styles ={
    footer:{
        display:'flex',
        padding:20,
        borderTop:'1px solid black',
        justifyContent:'center  '
    }
}
export default Footer