import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'

const styles = {
    btn: {
        margin: 12
    },
};


export default class ImportLdp extends Component {
    constructor() {
        super()
        this.renderErrorMessage.bind(this);
        this.state = {files: []}
    }

    onDrop(files, rejectedFiles) {
        this.setState({
            files
        });
    }


    renderErrorMessage(message){
        if(message === null || message.length === 0){
            return;
        } else{//onClick={this.props.clearSystemErrorMsg}
            return <h3 style={{display: 'flex', margin: 12 ,justifyContent: 'space-around', color: 'red'}}>{this.props.systemErrorMessage}</h3>
        }
    }

    uploadFiles(){
        if(this.state.files.length === 1) {
            this.props.importLDP(this.state.files[0]);
            this.setState({files: []})
        }
    }

    render() {
        return (
            <div >
                {this.renderErrorMessage(this.props)}
            <div style={{margin: 12, display: 'flex', flexDirection: "row", justifyContent: 'space-between'}}>
                <section style={{flex: 1, justifyContent: 'space-between'}}>
                    <h2>Import LDP DB</h2>
                    <RaisedButton style={styles.btn} label="Import" disabled={this.state.files.length !== 1}
                                  type="button" primary={true}
                                  className="RaisedButton"
                                  onClick={this.uploadFiles.bind(this)}/>

                    <div className="dropzone">
                        <Dropzone onDrop={this.onDrop.bind(this)} >
                            {/*<Dropzone onDrop={this.onDrop.bind(this)} accept={'application/json'}>*/}

                            <p>Drop LDP data JSON file here, or click to select file to upload.</p>
                        </Dropzone>
                    </div>
                    <aside>
                        <ul>
                            {
                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                            }
                        </ul>
                    </aside>
                </section>
                <section style={{flex: 1, justifyContent: 'spaceAround'}}>
                    <h2>Reload LDP Engine</h2>
                    <RaisedButton style={styles.btn} label="Reload"
                                  type="button" primary={true}
                                  className="RaisedButton"
                                  onClick={this.props.getReloadLdpEngine}/>
                </section>
            </div>
            </div>
        )
    }
}


