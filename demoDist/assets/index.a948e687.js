!function(){const c=document.createElement("link").relList;if(!(c&&c.supports&&c.supports("modulepreload"))){for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver((c=>{for(const Z of c)if("childList"===Z.type)for(const c of Z.addedNodes)"LINK"===c.tagName&&"modulepreload"===c.rel&&l(c)})).observe(document,{childList:!0,subtree:!0})}function l(c){if(c.ep)return;c.ep=!0;const l=function(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerpolicy&&(l.referrerPolicy=c.referrerpolicy),"use-credentials"===c.crossorigin?l.credentials="include":"anonymous"===c.crossorigin?l.credentials="omit":l.credentials="same-origin",l}(c);fetch(c.href,l)}}();const c=new Blob([atob("dmFyIF9fZGVmUHJvcD1PYmplY3QuZGVmaW5lUHJvcGVydHksX19kZWZQcm9wcz1PYmplY3QuZGVmaW5lUHJvcGVydGllcyxfX2dldE93blByb3BEZXNjcz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxfX2dldE93blByb3BTeW1ib2xzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsX19oYXNPd25Qcm9wPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksX19wcm9wSXNFbnVtPU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUsX19kZWZOb3JtYWxQcm9wPShlLHIsdCk9PnIgaW4gZT9fX2RlZlByb3AoZSxyLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTp0fSk6ZVtyXT10LF9fc3ByZWFkVmFsdWVzPShlLHIpPT57Zm9yKHZhciB0IGluIHJ8fChyPXt9KSlfX2hhc093blByb3AuY2FsbChyLHQpJiZfX2RlZk5vcm1hbFByb3AoZSx0LHJbdF0pO2lmKF9fZ2V0T3duUHJvcFN5bWJvbHMpZm9yKHZhciB0IG9mIF9fZ2V0T3duUHJvcFN5bWJvbHMocikpX19wcm9wSXNFbnVtLmNhbGwocix0KSYmX19kZWZOb3JtYWxQcm9wKGUsdCxyW3RdKTtyZXR1cm4gZX0sX19zcHJlYWRQcm9wcz0oZSxyKT0+X19kZWZQcm9wcyhlLF9fZ2V0T3duUHJvcERlc2NzKHIpKTshZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y29uc3QgZT0oZSx0LG4sbz1yKT0+e2NvbnN0IGE9byhuKTtyZXR1cm4gZSooMS1hKSt0KmF9LHI9ZT0+ZSx0PWU9PmUqZSooMy0yKmUpLG49ZT0+ZSplKmUqKDEwK2UqKDYqZS0xNSkpLG89TnVtYmVyLkVQU0lMT04vMixhPTQyOTQ5NjcyOTYscz0yKiotMzIsYz0oZT1gJHtEYXRlLm5vdygpfWApPT57Y29uc3Qgcj0oKCk9PntsZXQgZT00MDIyODcxMTk3O3JldHVybiByPT57cj1yLnRvU3RyaW5nKCk7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe2UrPXIuY2hhckNvZGVBdCh0KTt2YXIgbj0uMDI1MTk2MDMyODI0MTY5MzgqZTtlPW4+Pj4wLG4tPWUsZT0obio9ZSk+Pj4wLGUrPShuLT1lKSphfXJldHVybihlPj4+MCkqc319KSgpLHQ9W3IoIiAiKSxyKCIgIikscigiICIpLDFdO3RbMF0tPXIoZSksdFswXTwwJiYodFswXSs9MSksdFsxXS09cihlKSx0WzFdPDAmJih0WzFdKz0xKSx0WzJdLT1yKGUpLHRbMl08MCYmKHRbMl0rPTEpO2NvbnN0IG49e3JhbmRvbTooKT0+e2NvbnN0IGU9MjA5MTYzOSp0WzBdK3RbM10qcztyZXR1cm4gdFswXT10WzFdLHRbMV09dFsyXSx0WzJdPWUtKHRbM109TWF0aC5mbG9vcihlKSl9LHVpbnQzMjooKT0+bi5yYW5kb20oKSphLGZyYWN0NTM6KCk9Pm4ucmFuZG9tKCkrTWF0aC50cnVuYygyMDk3MTUyKm4ucmFuZG9tKCkpKm8sZXhwb3J0U3RhdGU6KCk9Pih7c2VlZDA6dFswXSxzZWVkMTp0WzFdLHNlZWQyOnRbMl0sY29uc3RhbnQ6dFszXX0pLGltcG9ydFN0YXRlOmU9PntbdFswXSx0WzFdLHRbMl0sdFszXV09W2Uuc2VlZDAsZS5zZWVkMSxlLnNlZWQyLGUuY29uc3RhbnRdfX07cmV0dXJuIG59O2Z1bmN0aW9uKmQoe3N0YXJ0OmUsZW5kOnIsc3RlcDp0PTF9KXtjb25zdCBuPShyLWUtTnVtYmVyLkVQU0lMT04pL3Q7Zm9yKGxldCBvPWUsYT0wO2E8bjthKz0xLG8rPXQpeWllbGQgb31jKCJCZXN0IE9mIGx1Y2shIikucmFuZG9tO2NvbnN0IGk9KGUscik9PihlJXIrciklcixsPShlLHIpPT5lWzBdKnJbMF0rZVsxXSpyWzFdK2VbMl0qclsyXSxwPWU9PihlPSgzNzM1OTI4NTU5XmUpKyhlPDw0KSxlXj1lPj4xMCxlKz1lPDw3LGVePWU+PjEzKSx1PXt4U2l6ZToyNTYsYmxlbmRGdW5jdGlvbjpuLHJhbmRvbTpjKCIzOGhyaWw7bF0tWyIpLnJhbmRvbX0sXz1fX3NwcmVhZFByb3BzKF9fc3ByZWFkVmFsdWVzKHt9LHUpLHt5U2l6ZTp1LnhTaXplfSksbT1fX3NwcmVhZFByb3BzKF9fc3ByZWFkVmFsdWVzKHt9LF8pLHt6U2l6ZTpfLnlTaXplfSksZj1bLi4uZCh7c3RhcnQ6MCxlbmQ6MipNYXRoLlBJLHN0ZXA6MipNYXRoLlBJLzh9KV0ubWFwKChlPT4oe3g6TWF0aC5jb3MoZSkqTWF0aC5TUVJUMV8yLHk6TWF0aC5zaW4oZSkqTWF0aC5TUVJUMV8yfSkpKSxoPVtbMCwuNSwuNV0sWzAsLS41LC41XSxbLjUsMCwuNV0sWy0uNSwwLC41XSxbLjUsLjUsMF0sWy0uNSwuNSwwXSxbMCwuNSwtLjVdLFswLC0uNSwtLjVdLFsuNSwwLC0uNV0sWy0uNSwwLC0uNV0sWy41LC0uNSwwXSxbLS41LC0uNSwwXV07KGU9Pntjb25zdCByPV9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LHUpLGUpO2UmJmUuc2VlZCYmKHIucmFuZG9tPWMoZS5zZWVkLnRvU3RyaW5nKDEwKSkucmFuZG9tKTtjb25zdCB0PW5ldyBVaW50OEFycmF5KHIueFNpemUpLm1hcCgoKGUsdCk9PjI1NSpyLnJhbmRvbSgpKSl9KSgpO051bWJlci5FUFNJTE9OOyhlPT57Y29uc3Qgcj1fX3NwcmVhZFZhbHVlcyhfX3NwcmVhZFZhbHVlcyh7fSxfKSxlKTtlJiZlLnNlZWQmJihyLnJhbmRvbT1jKGUuc2VlZC50b1N0cmluZygxMCkpLnJhbmRvbSk7Y29uc3QgdD0oKCk9Pntjb25zdCBlPVsuLi5kKHtzdGFydDowLGVuZDpyLnhTaXplfSldLm1hcCgoKCk9PlsuLi5kKHtzdGFydDowLGVuZDpyLnlTaXplfSldLm1hcCgoKCk9PmZbTWF0aC50cnVuYyhyLnJhbmRvbSgpKmYubGVuZ3RoKV0pKSkpLm1hcCgoZT0+Wy4uLmUsZVswXV0pKTtyZXR1cm5bLi4uZSxlWzBdXX0pKCl9KSgpO2NvbnN0IFM9cj0+e2NvbnN0IHQ9X19zcHJlYWRWYWx1ZXMoX19zcHJlYWRWYWx1ZXMoe30sbSkscik7aWYociYmci5zZWVkJiYhci5yYW5kb20mJih0LnJhbmRvbT1jKHIuc2VlZC50b1N0cmluZygpKS5yYW5kb20pLHQuX2ZvcmNlSGlnaE1lbW9yeU1vZGUmJnQuX2ZvcmNlTG93TWVtb3J5TW9kZSl0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgT3B0aW9ucywgY2FuIG5vdCBmb3JjZSBib3RoIGxvdyBhbmQgaGlnaCBtZW1vcnkgbW9kZXMgIik7Y29uc3Qgbj0oKGUscix0LG4sbz0hMSxhPSExKT0+IWEmJihvfHxlKnIqdD4yNTYqKjMpPygoKT0+e2NvbnN0IG49KCgpPT57Y29uc3Qgcj1uZXcgVWludDMyQXJyYXkoZSsxKS5tYXAoKChlLHIpPT4xMDQ4NTc1JnAoMTcqcis2MDM2MSkpKTtyZXR1cm4gcltlXT1yWzBdLHJ9KSgpLG89KCgpPT57Y29uc3QgZT1uZXcgVWludDMyQXJyYXkocisxKS5tYXAoKChlLHIpPT4xMDQ4NTc1JnAoMzEqcis3ODczKSkpO3JldHVybiBlW3JdPWVbMF0sZX0pKCksYT0oKCk9Pntjb25zdCBlPW5ldyBVaW50MzJBcnJheSh0KzEpLm1hcCgoKGUscik9PjEwNDg1NzUmcCgzMSpyKzI5Mzc4OTE2ODIpKSk7cmV0dXJuIGVbdF09ZVswXSxlfSkoKTtyZXR1cm4oZSxyLHQpPT5oWygobltlXT4+KDgmb1tyXSkpKyhvW3JdPj4oOCZhW3RdKSleYVt0XT4+KDgmbltlXSkpJWgubGVuZ3RoXX0pKCk6KCgpPT57Y29uc3Qgbz0oKCk9Pntjb25zdCBvPVsuLi5kKHtzdGFydDowLGVuZDplfSldLm1hcCgoKCk9PlsuLi5kKHtzdGFydDowLGVuZDpyfSldLm1hcCgoKCk9PlsuLi5kKHtzdGFydDowLGVuZDp0fSldLm1hcCgoKCk9PmhbTWF0aC50cnVuYyhuKCkqaC5sZW5ndGgpXSkpKSkubWFwKChlPT5bLi4uZSxlWzBdXSkpKSkubWFwKChlPT5bLi4uZSxlWzBdXSkpO3JldHVyblsuLi5vLG9bMF1dfSkoKTtyZXR1cm4oZSxyLHQpPT5vW2VdW3JdW3RdfSkoKSkodC54U2l6ZSx0LnlTaXplLHQuelNpemUsdC5yYW5kb20sdC5fZm9yY2VMb3dNZW1vcnlNb2RlLHQuX2ZvcmNlSGlnaE1lbW9yeU1vZGUpO3JldHVybihyLG8sYSk9Pntjb25zdCBzPU1hdGguZmxvb3IociksYz1NYXRoLmZsb29yKG8pLGQ9TWF0aC5mbG9vcihhKSxwPWkocyx0LnhTaXplKSx1PWkoYyx0LnlTaXplKSxfPWkoZCx0LnpTaXplKSxtPXItcyxmPW8tYyxoPWEtZCxTPWUoMCwxLG0sdC5ibGVuZEZ1bmN0aW9uKSx5PWUoMCwxLGYsdC5ibGVuZEZ1bmN0aW9uKSx3PWUoMCwxLGgsdC5ibGVuZEZ1bmN0aW9uKSx6PW4ocCx1LF8pLGc9bihwLHUsXysxKSxNPW4ocCx1KzEsXyksUD1uKHAsdSsxLF8rMSksYj1uKHArMSx1LF8pLE89bihwKzEsdSxfKzEpLHY9bihwKzEsdSsxLF8pLHg9bihwKzEsdSsxLF8rMSksST1sKHosW20sZixoXSksTD1sKGcsW20sZixoLTFdKSxOPWwoTSxbbSxmLTEsaF0pLFY9bChQLFttLGYtMSxoLTFdKSxFPWwoYixbbS0xLGYsaF0pLEg9bChPLFttLTEsZixoLTFdKSxqPWwodixbbS0xLGYtMSxoXSksQT1sKHgsW20tMSxmLTEsaC0xXSksRD1lKEksRSxTKSxGPWUoTCxILFMpLFU9ZShOLGosUyksQz1lKFYsQSxTKSxRPWUoRCxVLHkpLFI9ZShGLEMseSk7cmV0dXJuIGUoUSxSLHcpKy41fX07UygpO2xldCB5PVs1MDAsNTAwLChlLHIsdCk9Pi41XTtjb25zdCB3PWU9Pntzd2l0Y2goZSl7Y2FzZSJoZXJtaXRlIjpyZXR1cm4gdDtjYXNlInF1aW50aWMiOnJldHVybiBuO2Nhc2UibGluZWFyIjpyZXR1cm4gcjtkZWZhdWx0OnJldHVybiB0fX0sej1lPT57dmFyIHIsdCxuLG8sYTtyZXR1cm4gZXx8KGU9e2NhbnZhc0hlaWdodDo1MDAsY2FudmFzd2lkdGg6NTAwLHhTaXplOjI1Nix5U2l6ZToyNTYselNpemU6MjU2LGludGVycG9sYXRpb246Imhlcm1pdGUiLGZvcmNlSGlnaDohMSxmb3JjZUxvdzohMX0pLHt4U2l6ZTpudWxsIT0ocj1lLnhTaXplKT9yOjI1Nix5U2l6ZTpudWxsIT0odD1lLnlTaXplKT90OjI1Nix6U2l6ZTpudWxsIT0obj1lLnpTaXplKT9uOjI1NixibGVuZEZ1bmN0aW9uOncoZS5pbnRlcnBvbGF0aW9uKSxfZm9yY2VIaWdoTWVtb3J5TW9kZTpudWxsIT0obz1lLmZvcmNlSGlnaCkmJm8sX2ZvcmNlTG93TWVtb3J5TW9kZTpudWxsIT0oYT1lLmZvcmNlTG93KSYmYX19O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGU9Pnt2YXIgcjtjb25zdCB0PWUuZGF0YTsobnVsbD09KHI9dC5jb25zdHJ1Y3Rvcik/dm9pZCAwOnIuY2FudmFzSGVpZ2h0KSYmKHk9W3QuY29uc3RydWN0b3IuY2FudmFzd2lkdGgsdC5jb25zdHJ1Y3Rvci5jYW52YXNIZWlnaHQsUyh6KHQuY29uc3RydWN0b3IpKV0pLHQudXBkYXRlJiZzZWxmLnBvc3RNZXNzYWdlKGcodC51cGRhdGUuZnJhbWUpKX0pKTtjb25zdCBnPWU9Pntjb25zdFtyLHQsbl09eSxvPW5ldyBVaW50OENsYW1wZWRBcnJheSg0KnIqdCk7Zm9yKGxldCBhPTA7YTxyO2ErPTEpZm9yKGxldCByPTA7cjx0O3IrPTEpe2NvbnN0IHQ9TWF0aC5mbG9vcigyNTUqbihhLzI1LHIvMjUsZS8xMDApKTtNKGEsciwxLDEsdCxvKX1yZXR1cm4gbmV3IEltYWdlRGF0YShvLDUwMCw1MDApfSxNPShlLHIsdCxuLG8sYSxzPTUwMCk9Pntmb3IobGV0IGM9cjtjPHIrbjtjKz0xKWEuZmlsbChvLDQqZSs0KmMqcyw0KihlK3QpKzQqYypzKTtyZXR1cm4gYX19KCk7Cg==")],{type:"text/javascript;charset=utf-8"});function l(){const l=(window.URL||window.webkitURL).createObjectURL(c);try{return new Worker(l)}finally{(window.URL||window.webkitURL).revokeObjectURL(l)}}const Z=new Blob([atob("dmFyIF9fZGVmUHJvcD1PYmplY3QuZGVmaW5lUHJvcGVydHksX19kZWZQcm9wcz1PYmplY3QuZGVmaW5lUHJvcGVydGllcyxfX2dldE93blByb3BEZXNjcz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyxfX2dldE93blByb3BTeW1ib2xzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsX19oYXNPd25Qcm9wPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksX19wcm9wSXNFbnVtPU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUsX19kZWZOb3JtYWxQcm9wPShlLHIsdCk9PnIgaW4gZT9fX2RlZlByb3AoZSxyLHtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTp0fSk6ZVtyXT10LF9fc3ByZWFkVmFsdWVzPShlLHIpPT57Zm9yKHZhciB0IGluIHJ8fChyPXt9KSlfX2hhc093blByb3AuY2FsbChyLHQpJiZfX2RlZk5vcm1hbFByb3AoZSx0LHJbdF0pO2lmKF9fZ2V0T3duUHJvcFN5bWJvbHMpZm9yKHZhciB0IG9mIF9fZ2V0T3duUHJvcFN5bWJvbHMocikpX19wcm9wSXNFbnVtLmNhbGwocix0KSYmX19kZWZOb3JtYWxQcm9wKGUsdCxyW3RdKTtyZXR1cm4gZX0sX19zcHJlYWRQcm9wcz0oZSxyKT0+X19kZWZQcm9wcyhlLF9fZ2V0T3duUHJvcERlc2NzKHIpKTshZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Y29uc3QgZT0oZSx0LG4sbz1yKT0+e2NvbnN0IGE9byhuKTtyZXR1cm4gZSooMS1hKSt0KmF9LHI9ZT0+ZSx0PWU9PmUqZSooMy0yKmUpLG49ZT0+ZSplKmUqKDEwK2UqKDYqZS0xNSkpLG89TnVtYmVyLkVQU0lMT04vMixhPTQyOTQ5NjcyOTYscz0yKiotMzIsZD0oZT1gJHtEYXRlLm5vdygpfWApPT57Y29uc3Qgcj0oKCk9PntsZXQgZT00MDIyODcxMTk3O3JldHVybiByPT57cj1yLnRvU3RyaW5nKCk7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe2UrPXIuY2hhckNvZGVBdCh0KTt2YXIgbj0uMDI1MTk2MDMyODI0MTY5MzgqZTtlPW4+Pj4wLG4tPWUsZT0obio9ZSk+Pj4wLGUrPShuLT1lKSphfXJldHVybihlPj4+MCkqc319KSgpLHQ9W3IoIiAiKSxyKCIgIikscigiICIpLDFdO3RbMF0tPXIoZSksdFswXTwwJiYodFswXSs9MSksdFsxXS09cihlKSx0WzFdPDAmJih0WzFdKz0xKSx0WzJdLT1yKGUpLHRbMl08MCYmKHRbMl0rPTEpO2NvbnN0IG49e3JhbmRvbTooKT0+e2NvbnN0IGU9MjA5MTYzOSp0WzBdK3RbM10qcztyZXR1cm4gdFswXT10WzFdLHRbMV09dFsyXSx0WzJdPWUtKHRbM109TWF0aC5mbG9vcihlKSl9LHVpbnQzMjooKT0+bi5yYW5kb20oKSphLGZyYWN0NTM6KCk9Pm4ucmFuZG9tKCkrTWF0aC50cnVuYygyMDk3MTUyKm4ucmFuZG9tKCkpKm8sZXhwb3J0U3RhdGU6KCk9Pih7c2VlZDA6dFswXSxzZWVkMTp0WzFdLHNlZWQyOnRbMl0sY29uc3RhbnQ6dFszXX0pLGltcG9ydFN0YXRlOmU9PntbdFswXSx0WzFdLHRbMl0sdFszXV09W2Uuc2VlZDAsZS5zZWVkMSxlLnNlZWQyLGUuY29uc3RhbnRdfX07cmV0dXJuIG59O2Z1bmN0aW9uKmMoe3N0YXJ0OmUsZW5kOnIsc3RlcDp0PTF9KXtjb25zdCBuPShyLWUtTnVtYmVyLkVQU0lMT04pL3Q7Zm9yKGxldCBvPWUsYT0wO2E8bjthKz0xLG8rPXQpeWllbGQgb31kKCJCZXN0IE9mIGx1Y2shIikucmFuZG9tO2NvbnN0IGk9KGUscik9PihlJXIrciklcixwPShlLHIpPT5lLngqci54K2UueSpyLnksXz1lPT4oZT0oMzczNTkyODU1OV5lKSsoZTw8NCksZV49ZT4+MTAsZSs9ZTw8NyxlXj1lPj4xMyksbD17eFNpemU6MjU2LGJsZW5kRnVuY3Rpb246bixyYW5kb206ZCgiMzhocmlsO2xdLVsiKS5yYW5kb219LG09X19zcHJlYWRQcm9wcyhfX3NwcmVhZFZhbHVlcyh7fSxsKSx7eVNpemU6bC54U2l6ZX0pLHU9X19zcHJlYWRQcm9wcyhfX3NwcmVhZFZhbHVlcyh7fSxtKSx7elNpemU6bS55U2l6ZX0pLGY9Wy4uLmMoe3N0YXJ0OjAsZW5kOjIqTWF0aC5QSSxzdGVwOjIqTWF0aC5QSS84fSldLm1hcCgoZT0+KHt4Ok1hdGguY29zKGUpKk1hdGguU1FSVDFfMix5Ok1hdGguc2luKGUpKk1hdGguU1FSVDFfMn0pKSkseT1bWzAsLjUsLjVdLFswLC0uNSwuNV0sWy41LDAsLjVdLFstLjUsMCwuNV0sWy41LC41LDBdLFstLjUsLjUsMF0sWzAsLjUsLS41XSxbMCwtLjUsLS41XSxbLjUsMCwtLjVdLFstLjUsMCwtLjVdLFsuNSwtLjUsMF0sWy0uNSwtLjUsMF1dOyhlPT57Y29uc3Qgcj1fX3NwcmVhZFZhbHVlcyhfX3NwcmVhZFZhbHVlcyh7fSxsKSxlKTtlJiZlLnNlZWQmJihyLnJhbmRvbT1kKGUuc2VlZC50b1N0cmluZygxMCkpLnJhbmRvbSk7Y29uc3QgdD1uZXcgVWludDhBcnJheShyLnhTaXplKS5tYXAoKChlLHQpPT4yNTUqci5yYW5kb20oKSkpfSkoKTtjb25zdCBoPTEtTnVtYmVyLkVQU0lMT04sUz1yPT57Y29uc3QgdD1fX3NwcmVhZFZhbHVlcyhfX3NwcmVhZFZhbHVlcyh7fSxtKSxyKTtyJiZyLnNlZWQmJih0LnJhbmRvbT1kKHIuc2VlZC50b1N0cmluZygxMCkpLnJhbmRvbSk7Y29uc3Qgbj0oKCk9Pntjb25zdCBlPVsuLi5jKHtzdGFydDowLGVuZDp0LnhTaXplfSldLm1hcCgoKCk9PlsuLi5jKHtzdGFydDowLGVuZDp0LnlTaXplfSldLm1hcCgoKCk9PmZbTWF0aC50cnVuYyh0LnJhbmRvbSgpKmYubGVuZ3RoKV0pKSkpLm1hcCgoZT0+Wy4uLmUsZVswXV0pKTtyZXR1cm5bLi4uZSxlWzBdXX0pKCk7cmV0dXJuKHIsbyk9Pntjb25zdCBhPU1hdGguZmxvb3Iocikscz1NYXRoLmZsb29yKG8pLGQ9aShhLHQueFNpemUpLGM9aShzLHQueVNpemUpLF89ZCsxLGw9YysxLG09ci1hLHU9by1zLGY9ZSgwLDEsbSx0LmJsZW5kRnVuY3Rpb24pLHk9ZSgwLDEsdSx0LmJsZW5kRnVuY3Rpb24pLFM9bltkXVtjXSxQPW5bZF1bbF0sdz1uW19dW2NdLGc9bltfXVtsXSxNPXAoUyx7eDptLHk6dX0pLGI9cChQLHt4Om0seTp1LTF9KSx6PXAodyx7eDptLTEseTp1fSksTz1wKGcse3g6bS0xLHk6dS0xfSkseD1lKE0seixmKSx2PWUoYixPLGYpLEk9ZSh4LHYseSk7cmV0dXJuIE1hdGgubWluKEkrLjUsaCl9fTtTKCk7KGU9Pntjb25zdCByPV9fc3ByZWFkVmFsdWVzKF9fc3ByZWFkVmFsdWVzKHt9LHUpLGUpO2lmKGUmJmUuc2VlZCYmIWUucmFuZG9tJiYoci5yYW5kb209ZChlLnNlZWQudG9TdHJpbmcoKSkucmFuZG9tKSxyLl9mb3JjZUhpZ2hNZW1vcnlNb2RlJiZyLl9mb3JjZUxvd01lbW9yeU1vZGUpdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIE9wdGlvbnMsIGNhbiBub3QgZm9yY2UgYm90aCBsb3cgYW5kIGhpZ2ggbWVtb3J5IG1vZGVzICIpO2NvbnN0IHQ9KChlLHIsdCxuLG89ITEsYT0hMSk9PiFhJiYob3x8ZSpyKnQ+MjU2KiozKT8oKCk9Pntjb25zdCBuPSgoKT0+e2NvbnN0IHI9bmV3IFVpbnQzMkFycmF5KGUrMSkubWFwKCgoZSxyKT0+MTA0ODU3NSZfKDE3KnIrNjAzNjEpKSk7cmV0dXJuIHJbZV09clswXSxyfSkoKSxvPSgoKT0+e2NvbnN0IGU9bmV3IFVpbnQzMkFycmF5KHIrMSkubWFwKCgoZSxyKT0+MTA0ODU3NSZfKDMxKnIrNzg3MykpKTtyZXR1cm4gZVtyXT1lWzBdLGV9KSgpLGE9KCgpPT57Y29uc3QgZT1uZXcgVWludDMyQXJyYXkodCsxKS5tYXAoKChlLHIpPT4xMDQ4NTc1Jl8oMzEqcisyOTM3ODkxNjgyKSkpO3JldHVybiBlW3RdPWVbMF0sZX0pKCk7cmV0dXJuKGUscix0KT0+eVsoKG5bZV0+Pig4Jm9bcl0pKSsob1tyXT4+KDgmYVt0XSkpXmFbdF0+Pig4Jm5bZV0pKSV5Lmxlbmd0aF19KSgpOigoKT0+e2NvbnN0IG89KCgpPT57Y29uc3Qgbz1bLi4uYyh7c3RhcnQ6MCxlbmQ6ZX0pXS5tYXAoKCgpPT5bLi4uYyh7c3RhcnQ6MCxlbmQ6cn0pXS5tYXAoKCgpPT5bLi4uYyh7c3RhcnQ6MCxlbmQ6dH0pXS5tYXAoKCgpPT55W01hdGgudHJ1bmMobigpKnkubGVuZ3RoKV0pKSkpLm1hcCgoZT0+Wy4uLmUsZVswXV0pKSkpLm1hcCgoZT0+Wy4uLmUsZVswXV0pKTtyZXR1cm5bLi4ubyxvWzBdXX0pKCk7cmV0dXJuKGUscix0KT0+b1tlXVtyXVt0XX0pKCkpKHIueFNpemUsci55U2l6ZSxyLnpTaXplLHIucmFuZG9tLHIuX2ZvcmNlTG93TWVtb3J5TW9kZSxyLl9mb3JjZUhpZ2hNZW1vcnlNb2RlKX0pKCk7Y29uc3QgUD1lPT57c3dpdGNoKGUpe2Nhc2UiaGVybWl0ZSI6cmV0dXJuIHQ7Y2FzZSJxdWludGljIjpyZXR1cm4gbjtjYXNlImxpbmVhciI6cmV0dXJuIHI7ZGVmYXVsdDpyZXR1cm4gdH19O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKGU9Pntjb25zdCByPWUuZGF0YSx0PXIuY29uc3RydWN0b3IuY2FudmFzV2lkdGgsbj1yLmNvbnN0cnVjdG9yLmNhbnZhc0hlaWdodCxvPVMoKGU9Pntjb25zdCByPV9fc3ByZWFkVmFsdWVzKHt4U2l6ZToyNTYseVNpemU6MjU2LGludGVycG9sYXRpb246Imhlcm1pdGUifSxlKTtyZXR1cm57eFNpemU6ci54U2l6ZSx5U2l6ZTpyLnlTaXplLGJsZW5kRnVuY3Rpb246UChyLmludGVycG9sYXRpb24pfX0pKHIuY29uc3RydWN0b3IpKSxhPW5ldyBVaW50OENsYW1wZWRBcnJheSg0KnQqbik7Zm9yKGxldCBzPTA7czx0O3MrPTEpZm9yKGxldCBlPTA7ZTxuO2UrPTEpe2NvbnN0IHI9TWF0aC5mbG9vcigyNTUqbyhzLzI1LGUvMjUpKTt3KHMsZSwxLDEscixhKX1zZWxmLnBvc3RNZXNzYWdlKG5ldyBJbWFnZURhdGEoYSx0LG4pKX0pKTtjb25zdCB3PShlLHIsdCxuLG8sYSxzPTUwMCk9Pntmb3IobGV0IGQ9cjtkPHIrbjtkKz0xKWEuZmlsbChvLDQqZSs0KmQqcyw0KihlK3QpKzQqZCpzKTtyZXR1cm4gYX19KCk7Cg==")],{type:"text/javascript;charset=utf-8"});function b(){const c=(window.URL||window.webkitURL).createObjectURL(Z);try{return new Worker(c)}finally{(window.URL||window.webkitURL).revokeObjectURL(c)}}const d=(c,Z)=>{const b=new l;return b.addEventListener("message",(l=>{var Z;null==(Z=c.getContext("2d"))||Z.putImageData(l.data,0,0)})),b.postMessage({constructor:Z}),b.postMessage({update:{frame:0}}),b};(()=>{const c=document.querySelector("#perlin2d"),l=document.querySelector("#perlin3d-default"),Z=document.querySelector("#perlin3d-scale"),m=(c,l="white")=>{const Z=c.getContext("2d");Z&&(Z.fillStyle=l,Z.fillRect(0,0,c.width,c.height))};m(c),m(l),m(Z);const s=d(l,{canvasHeight:500,canvaswidth:500,seed:563729047,forceHigh:!0}),K=d(Z,{canvasHeight:500,canvaswidth:500,seed:563759047,forceLow:!0}),y=new b;y.addEventListener("message",(l=>{var Z;null==(Z=c.getContext("2d"))||Z.putImageData(l.data,0,0)})),y.postMessage({constructor:{canvasHeight:c.height,canvasWidth:c.width,interpolation:"quintic",seed:823662918}});let L=0;const t=()=>{L+=1,L%6==0&&s.postMessage({update:{frame:L}}),(L+3)%6==0&&K.postMessage({update:{frame:L}}),window.requestAnimationFrame(t)};t()})();
