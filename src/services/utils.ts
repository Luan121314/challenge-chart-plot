import { EventDataProps } from "../interfaces";

export function randomNumber(min = 0, max = 255) {
    return Math.floor(Math.random() * max) + min
}

export function generateColor() {
    const r = randomNumber()
    const g = randomNumber()
    const b = randomNumber()
    const colors = { rgb: `rgb(${r}, ${g}, ${b})`, rgba: `rgba(${r}, ${g}, ${b}, 0.2)` };
    return colors;
}

export function toUpperCaseFistLetter(str:string){
    const letters =  str.split("");
    const firstLetter = letters[0].toUpperCase()
    const newString = `${firstLetter}${str.substr(1)}`
    return newString;
  }
  
  export function FormatterKey(str: string){
      const syllables = str.split("_");
      return syllables.map(syllable => toUpperCaseFistLetter(syllable)).join(" ") ;
  }
  
  function getEventsInGroup(array: Array<EventDataProps>, keys: Array<string>, value: any, selects: Array<string>) {
      const primaryKey = keys[0] as keyof EventDataProps;
      const secondaryKey = keys[1] as keyof EventDataProps;
      let eventsSerialize: Array<any> = []
  
      for (let selectItem of selects) {
          const filterKey = array.filter(event =>
              event[primaryKey] === value[primaryKey] &&
              event[secondaryKey] === value[secondaryKey])
              .map(event => {
                  const select = selectItem as keyof EventDataProps
                  const { os, browser } = event;
                  const osCapitalize = toUpperCaseFistLetter(os as string);
                  const browserCapitalize = toUpperCaseFistLetter(browser as string);
                  const keyFormatted = FormatterKey(selectItem);
                  const label = `${osCapitalize} ${browserCapitalize} ${keyFormatted}`;
                  const data = Number(event[select]);
                  return { label, data };
              })
  
          eventsSerialize = [...eventsSerialize, filterKey]
      }
  
      return eventsSerialize
  }
  
  function getPossibleGroups(allDataEvents: Array<EventDataProps>, keys: Array<string>) {
      const primaryKey = keys[0] as keyof EventDataProps;
      const secondaryKey = keys[1] as keyof EventDataProps;
      const possiblesGroups: Array<object> = [];
      const compared: Array<string> = []
  
      allDataEvents.forEach(event => {
          if (compared.includes(JSON.stringify({ [primaryKey]: event[primaryKey], [secondaryKey]: event[secondaryKey] }))) return;
          if (event.hasOwnProperty(primaryKey) && event.hasOwnProperty(secondaryKey)) {
              const possibleGroup = { [primaryKey]: event[primaryKey], [secondaryKey]: event[secondaryKey] }
              possiblesGroups.push(possibleGroup)
              compared.push(JSON.stringify(possibleGroup))
          }
      })
  
      return possiblesGroups;
  }
  
  
  export function serializeDataForGraph(collectionEvents:Array<EventDataProps>, groups: Array<string>, select:Array<string>) {
  
      const events = collectionEvents.sort((eventCurrent, eventNext) => 
      new Date(eventCurrent.timestamp).getTime() - new Date(eventNext.timestamp).getTime() )
      const possiblesGroups = getPossibleGroups(events, groups);
      let eventsSerialize: Array<any> = [];
      possiblesGroups.forEach(group => {
          const result = getEventsInGroup(events, groups, group, select)
          eventsSerialize = eventsSerialize.concat(result)
      })
  
      const datasets = eventsSerialize.map(event => {
          const label = event[0].label
          const data = [event[0].data, event[1].data]
          return { label, data }
      })
  
      return datasets
  }
  
  
  
  


