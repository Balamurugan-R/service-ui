/*
 * Copyright 2016 EPAM Systems
 * 
 * 
 * This file is part of EPAM Report Portal.
 * https://github.com/epam/ReportPortal
 * 
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */ 
 
define([
    'backbone',
    'util'
], function(Backbone, Util) {
    'use strict';

    var MessagePanel = Backbone.View.extend({

        tpl: 'tpl-messages-panel',

        initialize: function () {
            this.collection = new Backbone.Collection();
            this.collection.on('add', this.render, this);
        },

        render: function () {
            this.$el.empty();
            if (this.collection.length !== 0) {
                var last = this.collection.pop();
                var content = Util.templates(this.tpl, last.toJSON());
                this.$el.append(content);
            }
        },

        events: {
            'click: button.close': 'close'
        },

        close: function (ev) {
            this.$el.empty();
        }

    });

    var Success = MessagePanel.extend({

        tpl: 'tpl-messages-single',

        initialize: function () {
            this.collection = new Backbone.Collection();
            this.collection.on('add', this.render, this);
        },

        render: function () {
            this.$el.empty();
            if (this.collection.length !== 0) {
                var last = this.collection.pop();
                var content = Util.templates(this.tpl, last.toJSON());
                this.$el.html(content);
                if (last.get('clazz') !== 'alert') {
                    setTimeout(function () {
                        $(".message-fade", this.$el).fadeOut(500);
                    }, 5000);
                }
            }
        },

        events: {
            'click': 'close'
        },

        close: function (ev) {
            this.$el.find(".message-fade").fadeOut(500);
        }

    });

    return {
        MessagePanel: MessagePanel,
        Success: Success
    };

});