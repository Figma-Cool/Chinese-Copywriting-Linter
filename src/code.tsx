import { setupMainThread } from 'react-figma/rpc';
import pangu from 'pangu';

figma.showUI(__html__, { visible: false });

const selection = figma.currentPage.selection;

selection.forEach(t => {
    if (t.type === "TEXT") {
        const newText = pangu.spacing(t.characters.replace(/~/g, '～')
            .replace(/!/g, '！')
            .replace(/;/g, '；')
            .replace(/:/g, '：')
            .replace(/,/g, '，')
            .replace(/\./g, '。')
            .replace(/\?/g, '？')
        );

        async function font() {
            await figma.loadFontAsync({ family: t.fontName.family, style: t.fontName.style });
            t.characters = newText;
        }

        font()
        t.setRelaunchData({ open: "" });
    }
})

setupMainThread();
figma.closePlugin();


