solve = (arr) => {
    let subtractNumber = Number(arr.shift());
    arr.forEach(element => {
        if (element !== 'end') {
            let newCode = element.split('')
                .map(x => String.fromCharCode(x.charCodeAt(0) - subtractNumber))
                .join('');
            let pattern = /@(?<names>[A-Za-z]+)[^@\-!:>]+!G!/g;
            if ((validCode = pattern.exec(newCode)) !== null) {
                let name = validCode[1];
                console.log(name);
            }
        }
    });
};
/*solve(['3',
    'CNdwhamigyenumje$J$',
    'CEreelh-nmguuejn$J$',
    'CVwdq&gnmjkvng$Q$',
    'end']);*/
/*
solve([ '3',
    'N}eideidmk$\'(mnyenmCNlpamnin$J$asdasda',
    'ddddkkkkmvkvmCFrqqru-nvevek$J$nmgievnge',
    'ppqmkkkmnolmnnCEhq/vkievk$Q$',
    'yyegiivoguCYdohqwlqh/kguimhk$J$',
    'end' ]);*/

solve(['4',
    '~lwzjkl~jenlymfDFsffmiCwozwlzjln%K%',
    '0zfjrl}xnrlDWeqqmi/wnznlwzjnn%K%onhfhnf',
    ';:<lyiljz{onzDPere=;=9<;8=rhknlf%K%',
    "Wonvfkmwzkmpwvzkm'lhjnlDWeqerxle0wlnzj{nz%K%nohwn",
    'DReh}e=<4lhzj1%K%',
    'end']);
