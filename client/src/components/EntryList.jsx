import React from 'react';
import Entry from './Entry.jsx';
import { Divider, Form, Label, Button, Header, Menu, Icon } from 'semantic-ui-react'

const EntryList = (props) => (
      <div className="ui segment">
        {props.data.map((data, index) => {
            return (  
              <div key={index}>
                {data['down_votes'] < 0 ?
                null
                :
                <div>
                <Entry
                  data={data} 
                  user={props.user} 
                  deleteEntry={props.deleteEntry} 
                  getEntries={props.getEntries}
                  getComments={props.getComments}
                />
                </div>
                }
              </div>
            )
          }
        )}
      </div>

);

export default EntryList;
