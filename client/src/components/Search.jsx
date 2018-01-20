import React from 'react';

class Search extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {
			google: false
		}
		this.toggleGoogle = this.toggleGoogle.bind(this);
	}


	toggleGoogle = () => {
		if (document.getElementById('select').value === 'google') {
		  this.setState({google: true},
			  (function() {
			    var cx = '000953156395195838223:gspdbzq4kqq';
			    var gcse = document.createElement('script');
			    gcse.type = 'text/javascript';
			    gcse.async = true;
			    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(gcse, s);
			  })()
      )
	  } else {
	  	this.setState({google: false});
	  }
	}

	render = () => {
		return (
		  <div className="search-container" >
		  {this.state.google ? <div id="test"></div> : 
		    <input type="search" id="search" placeholder="search... " onChange={() => this.props.handleSearch()}/>}
          <select id="select" onChange={() => this.toggleGoogle()}>
            <option value="betterhue">BetterHue</option>
            <option value="google">Google</option>
            <option value="wikipedia">Wikipedia</option>
            <option value="reddit">Reddit</option>
          </select>
		  </div>
		);
	}
}

export default Search;
