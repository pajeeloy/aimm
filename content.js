// content.js

(function() {
    // Define the replaceText function
    function replaceText(textNode) {
        let text = textNode.nodeValue;

        // Replace "GenAI" with "Generative Matrix Multiplication" (ignore case)
        text = text.replace(/GenAI/gi, "Generative Matrix Multiplication");

        // Replace "Artificial Intelligence" with "Matrix Multiplication" (ignore case)
        text = text.replace(/Artificial Intelligence/gi, "Matrix Multiplication");

        // Replace "AI" with "Matrix Multiplication" (ignore case, whole word)
        text = text.replace(/\bAI\b/gi, "Matrix Multiplication");

        // Replace "OpenAI" with "Matrix Multiplication" (ignore case, whole word)
        text = text.replace(/OpenAI/gi, "Open Matrix Multiplication");

        textNode.nodeValue = text;
    }

    // Define the walk function
    function walk(node) {
        let child, next;

        switch (node.nodeType) {
            case 1: // Element node
                if (/^(script|style|iframe|canvas)$/i.test(node.tagName)) {
                    return;
                }
                // Recursively process child nodes
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;

            case 3: // Text node
                replaceText(node);
                break;
        }
    }

    // Start processing from the body element
    walk(document.body);

    // Observe dynamic content changes
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                // Only process element and text nodes
                if (node.nodeType === 1 || node.nodeType === 3) {
                    walk(node);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
