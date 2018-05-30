import React, {Fragment} from "react";

export default (string) => {
    let code = string;

    const findAndReplace = [
        {
            match: /(.*):\s(\S*)\s/gm, //nodes: [Node]
            replacement: '<div class="line property">&nbsp;&nbsp;<span class="cm-property">$1</span>: <span class="cm-string">$2</span></div>'
        },
        {
            match: /}/gm, // }
            replacement: '<div class="line end-definition"><span class="cm-punctuation">}</span></div><div class="line">&nbsp;</div>'
        },
        {
            match: /#(.*)/gm, // # Node Types
            replacement: '<div class="line comment"><span class="cm-comment">#$1</span></div>'
        },
        {
            match: /(type|input)\s(\w*)\s(\w*)\s(\w*)\s{/gm, //type Place implements Node {
            replacement: '<div class="line definition"><span class="cm-def">$1</span> <span class="cm-qualifier"><b>$2</b></span> <span class="cm-def">$3</span> <span class="cm-qualifier"><b>$4</b></span> {</div>'
        },
        {
            match: /(type|input|interface)\s(\w*)\s{/gm, //interface Connection {
            replacement: '<div class="line definition"><span class="cm-def">$1</span> <span class="cm-qualifier"><b>$2</b></span> {</div>'
        },
        {
            match: /schema {/gm, //interface Connection {
            replacement: '<div class="line definition"><span class="cm-def">schema</span> {</div>'
        }
    ];

    findAndReplace.forEach(pattern => {
        code = code.replace(pattern.match, pattern.replacement);
    });

    return (
        <Fragment>
            <div dangerouslySetInnerHTML={{__html: code}} ></div>
        </Fragment>
    );
}