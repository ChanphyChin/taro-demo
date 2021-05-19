export const getQueryVariable = (search: string) =>
{
       var vars = search.split("&");
       let params: {[key:string]: any} = {};
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               params[pair[0]] = pair[1];
       }
       return params;
};