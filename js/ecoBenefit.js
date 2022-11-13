let currentWidth = 0;

const singleContainer = '.single-container';
const multiContainer = '.multi-container';

const getHorizontalChartHeight = (d) => Math.floor(parseFloat((d.length || d)) * 30);

const getElementHeight = (e) => Math.floor(parseFloat($(e).height()));
const getElementWidth = (e) => Math.floor(parseFloat($(e).width()));

const getBBoxHeight = (de) => Math.floor((de.node().getBBox().height));
const getBBoxWidth = (de) => Math.floor((de.node().getBBox().width));

const getSVGHeight = (de) => Math.floor((de.node().getBoundingClientRect().height));
const getSVGWidth = (de) => Math.floor((de.node().getBoundingClientRect().width));

const setViewBoxAttr = (de) => {
    const box = de.node().getBBox();
    de.attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
};

const sanitizeString = (s) => s.replace(/([^a-z0-9]+)/gi, '-').toLowerCase();
