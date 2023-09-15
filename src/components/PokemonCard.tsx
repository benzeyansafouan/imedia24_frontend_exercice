import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {RiSearch2Line} from 'react-icons/ri';
import {Pokemon} from 'models/pokemon';


interface PokemonCardProps {
    pokemon: Pokemon[];
    loading: boolean;
}


const PokemonCard: React.FC<PokemonCardProps> = ({pokemon, loading}) => {

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchInput, setSearchInput] = useState('');


    // function to open the modal and display pokemon details
    const openPokeInfo = async (res: Pokemon) => {
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        handleShow();
    }
    // component rendering
    return (
        <>
            <Modal show={showModal} onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{pokeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokeImg} className="img-fluid img-height" alt="Responsive image"></img>
                    <p>
                        Height : {pokeHeight}
                    </p>

                    <p>
                        Weight : {pokeWeight}
                    </p>
                </Modal.Body>
            </Modal>
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback">
                    <RiSearch2Line className="search-icon"/>
                </span>
                <input type="text" className="form-control"
                       onChange={event => {
                           setSearchInput(event.target.value)
                       }}
                       placeholder="Search"/>
            </div>

            <div className="row card-row">
                {
                    loading ? <h1>Loading...</h1> :
                        pokemon.filter((item) => {
                            if (searchInput == '') {
                                return item
                            } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
                                return item
                            }
                        }).map((item) => {
                            return (
                                <div className="col-md-3">
                                    <div className="card poke-card" key={item.id} onClick={() => openPokeInfo(item)}>
                                        <img className="card-img-top card-img" src={item.sprites.front_default}
                                             alt={item.name}></img>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name">{item.name}</h5>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                }
            </div>
        </>
    );
};

export default PokemonCard;