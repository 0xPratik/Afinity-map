# Afinity Map

## Deployment Link is -> [Link](https://propratik1405.github.io/Afinity-map/).

# High level architecture of the application

primiarly for the state management of the application i have used React Context hook with react useReducer Hook.In this application there are two important Context providers First one is Highlights and another is Buckets. All the actions regarding the read,update and delete is mentioned in the content folder under reducer file. To persist the changes of the application in reload i have used localstorage. To implement the Drag and Drop feature for grouping highlights in bucket i have used react-beautiful-dnd. Currently there are 2 major components they are Card and AddFilterNav. Due to the constraints of Time the project is not fully completed but if i get extra time then it would be completed soon. I havent used React beautiful dnd before and i was getting nasty runtime errors soo unfortunetely i had to remove it to make the app working. 

# Regarding Storage
Currently the State is stored in localStorage but i can get that from a REST API or Headless CMS but creating the API myself.

### The Data Structure that i am using is :-

**Bucket : {
    id: string (using nanoid)
    bucketName: string
    highlights: []
}

Highlights : {
    id: string,
    userName: string,
    content: string,
    bucketid: string
}
**
# I could have added more parameeters here like bucket could have a color property soo that user could set the color of the bucket
# and in highlights i could have added timestamp and filter the bucker highlights according to date and time




To run this application in your local System you need to enter `yarn` to download all the dependencies and then  `yarn start` to kickstart the Project



