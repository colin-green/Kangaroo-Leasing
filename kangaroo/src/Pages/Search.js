import React from 'react';
import SearchForm from '../Components/SearchForm';
import {Container, Row, Column} from '../Components/Grid';
import SearchResults from '../Components/SearchResults';
import Nav from '../Components/Nav';
import API from '../utils/API';

class Search extends React.Component{
    state = {
        listings: [],
        location: "",
        price: "",
        rooms: "",
        negotiable:"",
        pets:"",
};


componentDidMount() {
    this.loadListings();
  }
;

callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  
    // Loads all books  and sets them to this.state.books
loadListings = () => {
 API.getListings()
    .then(res =>
    this.setState({ listings: res.data, location: "", price: "", rooms: "", negotiable: "", pets: "" })
    )
    .catch(err => console.log(err));
};



render () {
    return (
        <div>
            <Nav />
            <Container>
                <Row>
                    <Column>
                        {this.state.listings.map(listing => {
                        return (
                    <SearchForm option={listing.location} />
                            )
                        })}
                    </Column>
                    <Column>
                    <SearchResults />
                    <SearchResults />
                    <SearchResults />
                    <SearchResults />
                    </Column>
                </Row>
            </Container>       
        </div>
    );
};


}

export default Search;