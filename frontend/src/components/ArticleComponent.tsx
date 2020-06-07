import React from 'react';

class ArticleComponent extends React.Component <{data: object}> {
    render() {
        let data : any = this.props.data;

        return (
            <div>
                <div className="card-panel grey lighten-5 z-depth-3 hoverable thin">
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <img src={data['urlToImage']} alt={data['author']} className="circle responsive-img" />
                        </div>  
                        <div className="col s10 left-align">
                            <span className="black-text">{data['description']}</span>
                        </div>
                        
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
        
                      <span className="black-text">{data['PublishedAt']}</span>
                    </div>
                    <div className="row valign-wrapper right-align chip hoverable">
                    <span className="black-text">{data['url']}</span>
                        {/* <a href={data['source.name']} target='source.name'></a> */}
                    </div>
                </div>

            </div>
        );
    }
}

export default ArticleComponent;