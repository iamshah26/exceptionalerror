import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import axios from 'axios';

Vue.config.errorHandler = function (err) {
  // Get the error details
  const errorMessage = err.message;
  const stackTrace = err.stack;

  console.log("error from vue event handler ===>", errorMessage, stackTrace);
  console.log(process.env)
  
  // Create the JIRA ticket
  const data = {
    fields: {
      project: {
        key: 'EE'
      },
      summary: errorMessage,
      description: stackTrace.toString(),
      issuetype: {
        id: '10004'
      }
    }
  };
  
  axios.post('https://errorgene.atlassian.net/rest/api/2/issue/', data, {
    auth: {
      username: 'syed.haider@voltro.com',
      password: 'iPUX7n9nk2VXyRBJOWysF202',
    },
    
    headers:{
      'X-Atlassian-Token':'no-check',
    }
  })
  .then(response => {
    console.log('JIRA ticket created successfully', response)

  })
  .catch(error => {
    console.error('Error creating JIRA ticket:', error)
  });
  
}


new Vue({
  render: h => h(App),
}).$mount('#app')
