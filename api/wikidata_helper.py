import requests
import re

class WikidataHelper:
    def queryWikidataEntities(value):
        url = 'https://query.wikidata.org/sparql'

        wikidataIdRegex = "^[QP][0-9]+"
        isWikidataId = re.search(wikidataIdRegex, value)

        if isWikidataId:
            query = f'''
                SELECT distinct ?item ?itemLabel WHERE {{  
                    VALUES ?item {{  wd:{value}  }}
                    SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}    
                }}
            '''
        else: 
            query = f'''
                SELECT distinct ?item ?itemLabel WHERE {{  
                    ?item ?label "{value}"@en.
                    ?article schema:about ?item .
                    ?article schema:inLanguage "en" .
                    ?article schema:isPartOf <https://en.wikipedia.org/>. 
                    SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}    
                }}
            '''

        r = requests.get(url, params = {'format': 'json', 'query': query})
        
        output = []
        for result in r.json()['results']['bindings']:
            cleanResult = {
                'wikidataId': result['item']['value'].split("/")[-1],
                'label': result['itemLabel']['value']
            }
            output.append(cleanResult)

        return output
