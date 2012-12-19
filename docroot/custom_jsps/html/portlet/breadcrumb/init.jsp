<%--
/**
 * Copyright (c) 2000-2012 Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 *
 *
 *
 */
--%>

<%@ include file="/html/portlet/init.jsp" %>

<%
PortletPreferences preferences = renderRequest.getPreferences();

String portletResource = ParamUtil.getString(request, "portletResource");

if (Validator.isNotNull(portletResource)) {
	preferences = PortletPreferencesFactoryUtil.getPortletSetup(request, portletResource);
}

String displayStyle = PrefsParamUtil.getString(preferences, renderRequest, "displayStyle", "horizontal");
boolean showCurrentGroup = PrefsParamUtil.getBoolean(preferences, renderRequest, "showCurrentGroup", true);
boolean showCurrentPortlet = PrefsParamUtil.getBoolean(preferences, renderRequest, "showCurrentPortlet", true);
boolean showGuestGroup = PrefsParamUtil.getBoolean(preferences, renderRequest, "showGuestGroup", true);
boolean showLayout = PrefsParamUtil.getBoolean(preferences, renderRequest, "showLayout", true);
boolean showParentGroups = PrefsParamUtil.getBoolean(preferences, renderRequest, "showParentGroups", true);
boolean showPortletBreadcrumb = PrefsParamUtil.getBoolean(preferences, renderRequest, "showPortletBreadcrumb", true);
%>

<%@ include file="/html/portlet/breadcrumb/init-ext.jsp" %>