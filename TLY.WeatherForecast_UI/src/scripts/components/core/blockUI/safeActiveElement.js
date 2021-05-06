export default function safeActiveElement(doc) {
    doc = doc || document;
    let activeElement;

    try {
        activeElement = document.activeElement;
        if (!activeElement || !activeElement.nodeName) {
            activeElement = doc.body;
        }
    } catch (error) {
        activeElement = doc.body;
    }

    return activeElement;
}
