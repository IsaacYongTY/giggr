import React from 'react'
import Modal from 'react-modal'


export default class Database extends React.Component {

    constructor(props) {
        super(props)
        this.handleAddSong = this.handleAddSong.bind(this)

        this.state = {
            addSongModalOn: false
        }
    }

    handleAddSong() {
        console.log('Handled')

        this.setState((prevState) => {
            return { addSongModalOn: !prevState.addSongModalOn }
        })
        
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Key</th>
                        <th>Tempo</th>
                        <th>BPM</th>
                    </tr>
                </table>

                <Modal 
                    isOpen={this.state.addSongModalOn}
                    contentLabel = 'Add Supplier'
                >
                    <button onClick={this.handleAddSong}>Close</button>
                </Modal>
                <button onClick={this.handleAddSong}>Add Song</button>
            </div>
        )
    }
}