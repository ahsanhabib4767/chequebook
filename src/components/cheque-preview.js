import React from "react";

import html2pdf from "html2pdf-jspdf2";
import numToWords from 'num-to-words';

class ChequePreview extends React.Component {

    exportpdf = () => {
        
        const checkPreview = document.getElementById("cheque-preview");
        
        console.log("Export pdf: ", checkPreview);
        html2pdf(checkPreview,{
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        });
        this.props.closeCb();

    }
   
    render()
    {
        const numToWords = require('num-to-words');
        var converter = require('number-to-words');
        converter.toWords(21);
        console.log(converter);
        return (
            
            <div className="preview-container">
                <div className="preview-content">
                   <div id="cheque-preview" className="preview-body" style={{ color: 'red' }}>
                      <table style={{margin: '100px auto'}}> 
                        <tr>
                          <td className="borderClas">22-November-2021</td>
                          <td className="borderClas"></td>
                          <td className="borderClas"></td>
                        </tr>
                        <tr>
                          <td className="borderClas">DEPUTY COMMISSIONER <br></br> OF TAXES ,CIRCLE-127</td>
                          <td className="borderClas">DEPUTY COMMISSIONER OF TAXES ,CIRCLE-127 <br></br> Three Thousand Four Hundred Eighty Four </td>
                          <td style={{paddingLeft: '50px'}} className="borderClas">=3784.00</td>
                        </tr>
                        <tr>
                          <td className="borderClas">{numToWords(3540)}<br></br>MD AHSAN HABIB</td>
                          <td className="borderClas">{this.props.checkData.name}</td>
                          <td className="borderClas">{this.converter}</td>
                        </tr>
                      </table>
                   </div>

                   <div className="preview-footer">
                        <button
                         className="btn btn-danger"
                         onClick={this.props.closeCb}>
                            Cancel
                        </button> 
                        <button className="btn btn-success" onClick={this.exportpdf}>
                            Export
                        </button> 
                    </div>
                </div> 
            </div>
        )
    }
}

export default ChequePreview;