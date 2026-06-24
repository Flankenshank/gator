import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    };
};

type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
    const response = await fetch(feedURL, {
        headers: {
            'User-Agent': 'gator'
        }
    });

    const xmlString = await response.text();
    const parser = new XMLParser({ processEntities: false });
    const parsedObject = parser.parse(xmlString);

    if (!parsedObject.rss.channel) {
        throw new Error("Invalid RSS feed: Missing channel element");
    }
    const title = parsedObject.rss.channel.title || "";
    const link = parsedObject.rss.channel.link || "";
    const description = parsedObject.rss.channel.description || "";
    let items;
    if (Array.isArray(parsedObject.rss.channel.item)) {
        items = parsedObject.rss.channel.item;
    } else if (parsedObject.rss.channel.item) {
        items = [parsedObject.rss.channel.item];
    } else {
        items = [];
    }

    const rssItems: RSSItem[] = items.map((item: any) => ({
        title: item.title || "",
        link: item.link || "",
        description: item.description || "",
        pubDate: item.pubDate || ""
    }));

    return {
        channel: {
            title,
            link,
            description,
            item: rssItems
        }
    };

};