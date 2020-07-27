import * as schedule from 'node-schedule';
import * as Parser from 'rss-parser';
let parser = new Parser();
import DataSet from '../api/v1/dataset/dataset.model'


// Fetches RSS Feed from the journal every hour
const RSSURL :string = 'http://rss.sciencedirect.com/publication/science/00086223';
const scheduler = schedule.scheduleJob('0 * * * *', async function (){
    try{
        let feed = await parser.parseURL(RSSURL);
        feed.items.forEach(async (item) => {
            
            const paperTitle:string= item.title.replace("<![CDATA[", "").replace("/(<([^>]+)>)/ig", "");
            const snippets:string[] = item.contentSnippet.split('\n')
            const publication: string = snippets[0].split(':')[1].trim();
            const publicationDate: Date = new Date(publication)
            const journalTitle: string= snippets[1].split(':')[1].trim();
        
            const newDataset = new DataSet({
                paperTitle,
                journalTitle,
                publicationDate,
            });
            const dataset = await DataSet.find({paperTitle: paperTitle});
            
            if (dataset.length==0) {
                const res = await newDataset.save();
                console.log(res);
            }
        });
        console.log("RSS Feed Fetched");
    }
    catch(err){
        console.error(err);
    }
})

export default scheduler