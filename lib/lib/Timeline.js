'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Items = require('./items/Items');

var _Items2 = _interopRequireDefault(_Items);

var _InfoLabel = require('./layout/InfoLabel');

var _InfoLabel2 = _interopRequireDefault(_InfoLabel);

var _Sidebar = require('./layout/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Columns = require('./columns/Columns');

var _Columns2 = _interopRequireDefault(_Columns);

var _GroupRows = require('./row/GroupRows');

var _GroupRows2 = _interopRequireDefault(_GroupRows);

var _ScrollElement = require('./scroll/ScrollElement');

var _ScrollElement2 = _interopRequireDefault(_ScrollElement);

var _MarkerCanvas = require('./markers/MarkerCanvas');

var _MarkerCanvas2 = _interopRequireDefault(_MarkerCanvas);

var _window = require('../resize-detector/window');

var _window2 = _interopRequireDefault(_window);

var _calendar = require('./utility/calendar');

var _generic = require('./utility/generic');

var _defaultConfig = require('./default-config');

var _TimelineStateContext = require('./timeline/TimelineStateContext');

var _TimelineMarkersContext = require('./markers/TimelineMarkersContext');

var _HeadersContext = require('./headers/HeadersContext');

var _TimelineHeaders = require('./headers/TimelineHeaders');

var _TimelineHeaders2 = _interopRequireDefault(_TimelineHeaders);

var _DateHeader = require('./headers/DateHeader');

var _DateHeader2 = _interopRequireDefault(_DateHeader);

var _SidebarHeader = require('./headers/SidebarHeader');

var _SidebarHeader2 = _interopRequireDefault(_SidebarHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  _createClass(ReactCalendarTimeline, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        getTimelineContext: function getTimelineContext() {
          return _this2.getTimelineContext();
        }
      };
    }
  }]);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, (ReactCalendarTimeline.__proto__ || Object.getPrototypeOf(ReactCalendarTimeline)).call(this, props));

    _initialiseProps.call(_this);

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error('You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline');
    }

    var _getCanvasBoundariesF = (0, _calendar.getCanvasBoundariesFromVisibleTime)(visibleTimeStart, visibleTimeEnd),
        _getCanvasBoundariesF2 = _slicedToArray(_getCanvasBoundariesF, 2),
        canvasTimeStart = _getCanvasBoundariesF2[0],
        canvasTimeEnd = _getCanvasBoundariesF2[1];

    _this.state = {
      width: 1000,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      resizingItem: null,
      resizingEdge: null
    };

    var canvasWidth = (0, _calendar.getCanvasWidth)(_this.state.width);

    var _stackTimelineItems = (0, _calendar.stackTimelineItems)(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder),
        dimensionItems = _stackTimelineItems.dimensionItems,
        height = _stackTimelineItems.height,
        groupHeights = _stackTimelineItems.groupHeights,
        groupTops = _stackTimelineItems.groupTops;

    /* eslint-disable react/no-direct-mutation-state */


    _this.state.dimensionItems = dimensionItems;
    _this.state.height = height;
    _this.state.groupHeights = groupHeights;
    _this.state.groupTops = groupTops;

    /* eslint-enable */
    return _this;
  }

  _createClass(ReactCalendarTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resize(this.props);

      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }

      _window2.default.addListener(this);

      this.lastTouchDistance = null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }

      _window2.default.removeListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart;

      // are we changing zoom? Report it!
      if (this.props.onZoom && newZoom !== oldZoom) {
        this.props.onZoom(this.getTimelineContext());
      }

      // The bounds have changed? Report it!
      if (this.props.onBoundsChange && this.state.canvasTimeStart !== prevState.canvasTimeStart) {
        this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3);
      }

      // Check the scroll is correct
      var scrollLeft = Math.round(this.state.width * (this.state.visibleTimeStart - this.state.canvasTimeStart) / newZoom);
      if (this.scrollComponent.scrollLeft !== scrollLeft) {
        this.scrollComponent.scrollLeft = scrollLeft;
      }

      if (this.scrollHeaderRef.scrollLeft !== scrollLeft) {
        this.scrollHeaderRef.scrollLeft = scrollLeft;
      }
    }

    // called when the visible time changes


    // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
    // from.  Look to consolidate the logic for determining coordinate to time
    // as well as generalizing how we get time from click on the canvas

  }, {
    key: 'columns',
    value: function columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height) {
      return _react2.default.createElement(_Columns2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        height: height,
        verticalLineClassNamesForTime: this.props.verticalLineClassNamesForTime
      });
    }
  }, {
    key: 'rows',
    value: function rows(canvasWidth, groupHeights, groups) {
      return _react2.default.createElement(_GroupRows2.default, {
        groups: groups,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        groupHeights: groupHeights,
        clickTolerance: this.props.clickTolerance,
        onRowClick: this.handleRowClick,
        onRowDoubleClick: this.handleRowDoubleClick,
        horizontalLineClassNamesForGroup: this.props.horizontalLineClassNamesForGroup,
        onRowContextClick: this.handleScrollContextMenu
      });
    }
  }, {
    key: 'items',
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return _react2.default.createElement(_Items2.default, {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        dimensionItems: dimensionItems,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItem: this.state.selectedItem,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.doubleClickItem,
        onItemContextMenu: this.contextMenuClickItem,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected,
        scrollRef: this.scrollComponent
      });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', \n        ' + this.state.dragGroupTitle;
      } else if (this.state.resizeTime) {
        label = (0, _moment2.default)(this.state.resizeTime).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : undefined;
    }
  }, {
    key: 'sidebar',
    value: function sidebar(height, groupHeights) {
      var sidebarWidth = this.props.sidebarWidth;

      return sidebarWidth && _react2.default.createElement(_Sidebar2.default, {
        groups: this.props.groups,
        groupRenderer: this.props.groupRenderer,
        keys: this.props.keys,
        width: sidebarWidth,
        groupHeights: groupHeights,
        height: height

      });
    }
  }, {
    key: 'rightSidebar',
    value: function rightSidebar(height, groupHeights) {
      var rightSidebarWidth = this.props.rightSidebarWidth;

      return rightSidebarWidth && _react2.default.createElement(_Sidebar2.default, {
        groups: this.props.groups,
        keys: this.props.keys,
        groupRenderer: this.props.groupRenderer,
        isRightSidebar: true,
        width: rightSidebarWidth,
        groupHeights: groupHeights,
        height: height

      });
    }
  }, {
    key: 'childrenWithProps',
    value: function childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
      if (!this.props.children) {
        return null;
      }

      // convert to an array and remove the nulls
      var childArray = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];

      var childProps = {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        dimensionItems: dimensionItems,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        groupHeights: groupHeights,
        groupTops: groupTops,
        selected: this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || [],
        height: height,
        minUnit: minUnit,
        timeSteps: timeSteps
      };

      return _react2.default.Children.map(childArray, function (child) {
        if (child.type !== _TimelineHeaders2.default) {
          return _react2.default.cloneElement(child, childProps);
        } else {
          return null;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          items = _props.items,
          groups = _props.groups,
          sidebarWidth = _props.sidebarWidth,
          rightSidebarWidth = _props.rightSidebarWidth,
          timeSteps = _props.timeSteps,
          traditionalZoom = _props.traditionalZoom;
      var _state = this.state,
          draggingItem = _state.draggingItem,
          resizingItem = _state.resizingItem,
          width = _state.width,
          visibleTimeStart = _state.visibleTimeStart,
          visibleTimeEnd = _state.visibleTimeEnd,
          canvasTimeStart = _state.canvasTimeStart,
          canvasTimeEnd = _state.canvasTimeEnd;
      var _state2 = this.state,
          dimensionItems = _state2.dimensionItems,
          height = _state2.height,
          groupHeights = _state2.groupHeights,
          groupTops = _state2.groupTops;


      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasWidth = (0, _calendar.getCanvasWidth)(width);
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);

      var isInteractingWithItem = !!draggingItem || !!resizingItem;

      if (isInteractingWithItem) {
        var stackResults = (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, this.state.canvasTimeStart, this.state.canvasTimeEnd, this.props.keys, this.props.lineHeight, this.props.itemHeightRatio, this.props.stackItems, this.state.draggingItem, this.state.resizingItem, this.state.dragTime, this.state.resizingEdge, this.state.resizeTime, this.state.newGroupOrder);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }

      var outerComponentStyle = {
        height: height + 'px'
      };

      return _react2.default.createElement(
        _TimelineStateContext.TimelineStateProvider,
        {
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          showPeriod: this.showPeriod,
          timelineUnit: minUnit,
          timelineWidth: this.state.width
        },
        _react2.default.createElement(
          _TimelineMarkersContext.TimelineMarkersProvider,
          null,
          _react2.default.createElement(
            _HeadersContext.TimelineHeadersProvider,
            {
              registerScroll: this.handleHeaderRef,
              timeSteps: timeSteps,
              leftSidebarWidth: this.props.sidebarWidth,
              rightSidebarWidth: this.props.rightSidebarWidth
            },
            _react2.default.createElement(
              'div',
              {
                style: this.props.style,
                ref: function ref(el) {
                  return _this3.container = el;
                },
                className: 'react-calendar-timeline'
              },
              this.renderHeaders(),
              _react2.default.createElement(
                'div',
                { style: outerComponentStyle, className: 'rct-outer' },
                sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null,
                _react2.default.createElement(
                  _ScrollElement2.default,
                  {
                    scrollRef: this.getScrollElementRef,
                    width: width,
                    height: height,
                    onZoom: this.changeZoom,
                    onWheelZoom: this.handleWheelZoom,
                    traditionalZoom: traditionalZoom,
                    onScroll: this.onScroll,
                    isInteractingWithItem: isInteractingWithItem
                  },
                  _react2.default.createElement(
                    _MarkerCanvas2.default,
                    null,
                    this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
                    this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height),
                    this.rows(canvasWidth, groupHeights, groups),
                    this.infoLabel(),
                    this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps)
                  )
                ),
                rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights) : null
              )
            )
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visibleTimeStart = nextProps.visibleTimeStart,
          visibleTimeEnd = nextProps.visibleTimeEnd,
          items = nextProps.items,
          groups = nextProps.groups;

      // This is a gross hack pushing items and groups in to state only to allow
      // For the forceUpdate check

      var derivedState = { items: items, groups: groups

        // if the items or groups have changed we must re-render
      };var forceUpdate = items !== prevState.items || groups !== prevState.groups;

      // We are a controlled component
      if (visibleTimeStart && visibleTimeEnd) {
        // Get the new canvas position
        Object.assign(derivedState, (0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState));
      } else if (forceUpdate) {
        // Calculate new item stack position as canvas may have changed
        var canvasWidth = (0, _calendar.getCanvasWidth)(prevState.width);
        Object.assign(derivedState, (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, prevState.canvasTimeStart, prevState.canvasTimeEnd, nextProps.keys, nextProps.lineHeight, nextProps.itemHeightRatio, nextProps.stackItems, prevState.draggingItem, prevState.resizingItem, prevState.dragTime, prevState.resizingEdge, prevState.resizeTime, prevState.newGroupOrder));
      }

      return derivedState;
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

ReactCalendarTimeline.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  sidebarWidth: _propTypes2.default.number,
  rightSidebarWidth: _propTypes2.default.number,
  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  stickyHeader: _propTypes2.default.bool,
  lineHeight: _propTypes2.default.number,
  itemHeightRatio: _propTypes2.default.number,

  minZoom: _propTypes2.default.number,
  maxZoom: _propTypes2.default.number,

  clickTolerance: _propTypes2.default.number,

  canChangeGroup: _propTypes2.default.bool,
  canMove: _propTypes2.default.bool,
  canResize: _propTypes2.default.oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _propTypes2.default.bool,
  canSelect: _propTypes2.default.bool,

  stackItems: _propTypes2.default.bool,

  traditionalZoom: _propTypes2.default.bool,

  itemTouchSendsClick: _propTypes2.default.bool,

  horizontalLineClassNamesForGroup: _propTypes2.default.func,

  onItemMove: _propTypes2.default.func,
  onItemResize: _propTypes2.default.func,
  onItemClick: _propTypes2.default.func,
  onItemSelect: _propTypes2.default.func,
  onItemDeselect: _propTypes2.default.func,
  onCanvasClick: _propTypes2.default.func,
  onItemDoubleClick: _propTypes2.default.func,
  onItemContextMenu: _propTypes2.default.func,
  onCanvasDoubleClick: _propTypes2.default.func,
  onCanvasContextMenu: _propTypes2.default.func,
  onZoom: _propTypes2.default.func,

  moveResizeValidator: _propTypes2.default.func,

  itemRenderer: _propTypes2.default.func,
  groupRenderer: _propTypes2.default.func,

  style: _propTypes2.default.object,

  keys: _propTypes2.default.shape({
    groupIdKey: _propTypes2.default.string,
    groupTitleKey: _propTypes2.default.string,
    groupLabelKey: _propTypes2.default.string,
    groupRightTitleKey: _propTypes2.default.string,
    itemIdKey: _propTypes2.default.string,
    itemTitleKey: _propTypes2.default.string,
    itemDivTitleKey: _propTypes2.default.string,
    itemGroupKey: _propTypes2.default.string,
    itemTimeStartKey: _propTypes2.default.string,
    itemTimeEndKey: _propTypes2.default.string
  }),
  headerRef: _propTypes2.default.func,
  scrollRef: _propTypes2.default.func,

  timeSteps: _propTypes2.default.shape({
    second: _propTypes2.default.number,
    minute: _propTypes2.default.number,
    hour: _propTypes2.default.number,
    day: _propTypes2.default.number,
    month: _propTypes2.default.number,
    year: _propTypes2.default.number
  }),

  defaultTimeStart: _propTypes2.default.object,
  defaultTimeEnd: _propTypes2.default.object,

  visibleTimeStart: _propTypes2.default.number,
  visibleTimeEnd: _propTypes2.default.number,
  onTimeChange: _propTypes2.default.func,
  onBoundsChange: _propTypes2.default.func,

  selected: _propTypes2.default.array,

  headerLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthMediumLong: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourMedium: _propTypes2.default.string,
    hourMediumLong: _propTypes2.default.string,
    hourLong: _propTypes2.default.string
  }),

  subHeaderLabelFormats: _propTypes2.default.shape({
    yearShort: _propTypes2.default.string,
    yearLong: _propTypes2.default.string,
    monthShort: _propTypes2.default.string,
    monthMedium: _propTypes2.default.string,
    monthLong: _propTypes2.default.string,
    dayShort: _propTypes2.default.string,
    dayMedium: _propTypes2.default.string,
    dayMediumLong: _propTypes2.default.string,
    dayLong: _propTypes2.default.string,
    hourShort: _propTypes2.default.string,
    hourLong: _propTypes2.default.string,
    minuteShort: _propTypes2.default.string,
    minuteLong: _propTypes2.default.string
  }),

  resizeDetector: _propTypes2.default.shape({
    addListener: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  }),

  verticalLineClassNamesForTime: _propTypes2.default.func,

  children: _propTypes2.default.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  stickyHeader: true,
  lineHeight: 30,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,

  stackItems: false,

  traditionalZoom: false,

  horizontalLineClassNamesForGroup: null,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onZoom: null,

  verticalLineClassNamesForTime: null,

  moveResizeValidator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: _defaultConfig.defaultKeys,
  timeSteps: _defaultConfig.defaultTimeSteps,
  headerRef: function headerRef() {},
  scrollRef: function scrollRef() {},

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,

  headerLabelFormats: _defaultConfig.defaultHeaderLabelFormats,
  subHeaderLabelFormats: _defaultConfig.defaultSubHeaderLabelFormats,

  selected: null
};
ReactCalendarTimeline.childContextTypes = {
  getTimelineContext: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.getTimelineContext = function () {
    var _state3 = _this4.state,
        width = _state3.width,
        visibleTimeStart = _state3.visibleTimeStart,
        visibleTimeEnd = _state3.visibleTimeEnd,
        canvasTimeStart = _state3.canvasTimeStart,
        canvasTimeEnd = _state3.canvasTimeEnd;


    return {
      timelineWidth: width,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd
    };
  };

  this.resize = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this4.props;

    var _container$getBoundin = _this4.container.getBoundingClientRect(),
        containerWidth = _container$getBoundin.width;

    var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
    var canvasWidth = (0, _calendar.getCanvasWidth)(width);

    var _stackTimelineItems2 = (0, _calendar.stackTimelineItems)(props.items, props.groups, canvasWidth, _this4.state.canvasTimeStart, _this4.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this4.state.draggingItem, _this4.state.resizingItem, _this4.state.dragTime, _this4.state.resizingEdge, _this4.state.resizeTime, _this4.state.newGroupOrder),
        dimensionItems = _stackTimelineItems2.dimensionItems,
        height = _stackTimelineItems2.height,
        groupHeights = _stackTimelineItems2.groupHeights,
        groupTops = _stackTimelineItems2.groupTops;

    // this is needed by dragItem since it uses pageY from the drag events
    // if this was in the context of the scrollElement, this would not be necessary

    _this4.setState({
      width: width,
      dimensionItems: dimensionItems,
      height: height,
      groupHeights: groupHeights,
      groupTops: groupTops
    });

    _this4.scrollComponent.scrollLeft = width;
    _this4.scrollHeaderRef.scrollLeft = width;
  };

  this.onScroll = function (scrollX) {
    var width = _this4.state.width;
    var newScrollX = scrollX;
    // move the virtual canvas if needed
    // if scrollX is less...i dont know how to explain the logic here
    if (newScrollX < width * 0.5) {
      newScrollX += width;
    }
    if (newScrollX > width * 1.5) {
      newScrollX -= width;
    }

    _this4.scrollHeaderRef.scrollLeft = newScrollX;
    _this4.scrollComponent.scrollLeft = newScrollX;

    var canvasTimeStart = _this4.state.canvasTimeStart;

    var zoom = _this4.state.visibleTimeEnd - _this4.state.visibleTimeStart;

    var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

    if (_this4.state.visibleTimeStart !== visibleTimeStart || _this4.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      _this4.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this4.updateScrollCanvas);
    }
  };

  this.updateScrollCanvas = function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions) {
    var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this4.props.items;
    var groups = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this4.props.groups;

    _this4.setState((0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, _this4.props, _this4.state));
  };

  this.handleWheelZoom = function (speed, xPosition, deltaY) {
    _this4.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this4.state.width);
  };

  this.changeZoom = function (scale) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    var _props2 = _this4.props,
        minZoom = _props2.minZoom,
        maxZoom = _props2.maxZoom;

    var oldZoom = _this4.state.visibleTimeEnd - _this4.state.visibleTimeStart;
    var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
    var newVisibleTimeStart = Math.round(_this4.state.visibleTimeStart + (oldZoom - newZoom) * offset);

    _this4.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, _this4.updateScrollCanvas);
  };

  this.showPeriod = function (from, to) {
    var visibleTimeStart = from.valueOf();
    var visibleTimeEnd = to.valueOf();

    var zoom = visibleTimeEnd - visibleTimeStart;
    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return;
    }

    _this4.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this4.updateScrollCanvas);
  };

  this.selectItem = function (item, clickType, e) {
    if (_this4.state.selectedItem === item || _this4.props.itemTouchSendsClick && clickType === 'touch') {
      if (item && _this4.props.onItemClick) {
        var time = _this4.timeFromItemEvent(e);
        _this4.props.onItemClick(item, e, time);
      }
    } else {
      _this4.setState({ selectedItem: item });
      if (item && _this4.props.onItemSelect) {
        var _time = _this4.timeFromItemEvent(e);
        _this4.props.onItemSelect(item, e, _time);
      } else if (item === null && _this4.props.onItemDeselect) {
        _this4.props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
      }
    }
  };

  this.doubleClickItem = function (item, e) {
    if (_this4.props.onItemDoubleClick) {
      var time = _this4.timeFromItemEvent(e);
      _this4.props.onItemDoubleClick(item, e, time);
    }
  };

  this.contextMenuClickItem = function (item, e) {
    if (_this4.props.onItemContextMenu) {
      var time = _this4.timeFromItemEvent(e);
      _this4.props.onItemContextMenu(item, e, time);
    }
  };

  this.getTimeFromRowClickEvent = function (e) {
    var dragSnap = _this4.props.dragSnap;
    var _state4 = _this4.state,
        width = _state4.width,
        canvasTimeStart = _state4.canvasTimeStart,
        canvasTimeEnd = _state4.canvasTimeEnd;
    // this gives us distance from left of row element, so event is in
    // context of the row element, not client or page

    var offsetX = e.nativeEvent.offsetX;


    var time = (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, (0, _calendar.getCanvasWidth)(width), offsetX);
    time = Math.floor(time / dragSnap) * dragSnap;

    return time;
  };

  this.timeFromItemEvent = function (e) {
    var _state5 = _this4.state,
        width = _state5.width,
        visibleTimeStart = _state5.visibleTimeStart,
        visibleTimeEnd = _state5.visibleTimeEnd;
    var dragSnap = _this4.props.dragSnap;


    var scrollComponent = _this4.scrollComponent;

    var _scrollComponent$getB = scrollComponent.getBoundingClientRect(),
        scrollX = _scrollComponent$getB.left;

    var xRelativeToTimeline = e.clientX - scrollX;

    var relativeItemPosition = xRelativeToTimeline / width;
    var zoom = visibleTimeEnd - visibleTimeStart;
    var timeOffset = relativeItemPosition * zoom;

    var time = Math.round(visibleTimeStart + timeOffset);
    time = Math.floor(time / dragSnap) * dragSnap;

    return time;
  };

  this.dragItem = function (item, dragTime, newGroupOrder) {
    var newGroup = _this4.props.groups[newGroupOrder];
    var keys = _this4.props.keys;

    _this4.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupLabelKey) : ''
    });
  };

  this.dropItem = function (item, dragTime, newGroupOrder) {
    _this4.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
    if (_this4.props.onItemMove) {
      _this4.props.onItemMove(item, dragTime, newGroupOrder);
    }
  };

  this.resizingItem = function (item, resizeTime, edge) {
    _this4.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime
    });
  };

  this.resizedItem = function (item, resizeTime, edge, timeDelta) {
    _this4.setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
    if (_this4.props.onItemResize && timeDelta !== 0) {
      _this4.props.onItemResize(item, resizeTime, edge);
    }
  };

  this.handleRowClick = function (e, rowIndex) {
    // shouldnt this be handled by the user, as far as when to deselect an item?
    if (_this4.state.selectedItem) {
      _this4.selectItem(null);
    }

    if (_this4.props.onCanvasClick == null) return;

    var time = _this4.getTimeFromRowClickEvent(e);
    var groupId = (0, _generic._get)(_this4.props.groups[rowIndex], _this4.props.keys.groupIdKey);
    _this4.props.onCanvasClick(groupId, time, e);
  };

  this.handleRowDoubleClick = function (e, rowIndex) {
    if (_this4.props.onCanvasDoubleClick == null) return;

    var time = _this4.getTimeFromRowClickEvent(e);
    var groupId = (0, _generic._get)(_this4.props.groups[rowIndex], _this4.props.keys.groupIdKey);
    _this4.props.onCanvasDoubleClick(groupId, time, e);
  };

  this.handleScrollContextMenu = function (e, rowIndex) {
    if (_this4.props.onCanvasContextMenu == null) return;

    var timePosition = _this4.getTimeFromRowClickEvent(e);

    var groupId = (0, _generic._get)(_this4.props.groups[rowIndex], _this4.props.keys.groupIdKey);

    if (_this4.props.onCanvasContextMenu) {
      e.preventDefault();
      _this4.props.onCanvasContextMenu(groupId, timePosition, e);
    }
  };

  this.handleHeaderRef = function (el) {
    _this4.scrollHeaderRef = el;
    _this4.props.headerRef(el);
  };

  this.renderHeaders = function () {
    if (_this4.props.children) {
      var headerRenderer = void 0;
      _react2.default.Children.map(_this4.props.children, function (child) {
        if (child.type === _TimelineHeaders2.default) {
          headerRenderer = child;
        }
      });
      if (headerRenderer) {
        return headerRenderer;
      }
    }
    return _react2.default.createElement(
      _TimelineHeaders2.default,
      null,
      _react2.default.createElement(_DateHeader2.default, { unit: 'primaryHeader' }),
      _react2.default.createElement(_DateHeader2.default, null)
    );
  };

  this.getScrollElementRef = function (el) {
    _this4.props.scrollRef(el);
    _this4.scrollComponent = el;
  };
};

exports.default = ReactCalendarTimeline;
