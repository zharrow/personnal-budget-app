'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useWidgets } from '@/contexts/WidgetContext';
import { SoldeWidget } from '@/components/widgets/SoldeWidget';
import { CategoriesWidget } from '@/components/widgets/CategoriesWidget';
import { GarantiesWidget } from '@/components/widgets/GarantiesWidget';
import { RecentTransactionsWidget } from '@/components/widgets/RecentTransactionsWidget';
import { ExpensesChartWidget } from '@/components/widgets/ExpensesChartWidget';
import { CategoryPieWidget } from '@/components/widgets/CategoryPieWidget';
import { BalanceLineWidget } from '@/components/widgets/BalanceLineWidget';
import { BudgetProgressWidget } from '@/components/widgets/BudgetProgressWidget';
import { WidgetCustomizer } from './WidgetCustomizer';
import { Transaction, Garantie, Categorie, WidgetConfig } from '@/types';
import { Settings2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DraggableDashboardProps {
  transactions: Transaction[];
  garanties: Garantie[];
  categoriesData: Record<Categorie, number>;
  solde: number;
  depensesMois: number;
  variation: number;
}

export function DraggableDashboard({
  transactions,
  garanties,
  categoriesData,
  solde,
  depensesMois,
  variation,
}: DraggableDashboardProps) {
  const { widgets, currentLayout, updateWidgetPosition, isEditMode } = useWidgets();
  const [customizingWidget, setCustomizingWidget] = useState<WidgetConfig | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Layout | null>(null);
  const [collisionWidgets, setCollisionWidgets] = useState<Set<string>>(new Set());
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mesurer dynamiquement la largeur du conteneur
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    // Observer les changements de taille du conteneur (pour la sidebar)
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      resizeObserver.disconnect();
    };
  }, []);

  const layout: Layout[] = useMemo(
    () =>
      widgets
        .filter((w) => w.isVisible)
        .map((widget) => ({
          i: widget.id,
          x: widget.position.x,
          y: widget.position.y,
          w: widget.position.w,
          h: widget.position.h,
          minW: widget.position.minW || 2,
          minH: widget.position.minH || 2,
          maxW: widget.position.maxW || currentLayout.columns,
          maxH: widget.position.maxH || 6,
          static: widget.isLocked || false,
        })),
    [widgets, currentLayout.columns]
  );

  // Détecter les collisions pendant le drag
  const checkCollisions = (currentItem: Layout, allItems: Layout[]) => {
    const colliding = new Set<string>();

    allItems.forEach((item) => {
      if (item.i === currentItem.i) return;

      // Vérifier si les rectangles se chevauchent
      const collision = !(
        currentItem.x + currentItem.w <= item.x ||
        currentItem.x >= item.x + item.w ||
        currentItem.y + currentItem.h <= item.y ||
        currentItem.y >= item.y + item.h
      );

      if (collision) {
        colliding.add(item.i);
      }
    });

    setCollisionWidgets(colliding);
  };

  const handleDragStart = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    setIsDragging(true);
    setDraggedItem(newItem);
  };

  const handleDrag = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    setDraggedItem(newItem);
    checkCollisions(newItem, layout);
  };

  const handleDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    setIsDragging(false);
    setDraggedItem(null);
    setCollisionWidgets(new Set());
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    if (!isEditMode) return;

    newLayout.forEach((item) => {
      const widget = widgets.find((w) => w.id === item.i);
      if (
        widget &&
        !widget.isLocked &&
        (widget.position.x !== item.x ||
          widget.position.y !== item.y ||
          widget.position.w !== item.w ||
          widget.position.h !== item.h)
      ) {
        updateWidgetPosition(item.i, item.x, item.y, item.w, item.h);
      }
    });
  };

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'solde':
        return (
          <SoldeWidget
            solde={solde}
            depensesMois={depensesMois}
            variation={variation}
          />
        );
      case 'categories':
        return <CategoriesWidget data={categoriesData} />;
      case 'garanties':
        return <GarantiesWidget garanties={garanties} />;
      case 'transactions':
        return <RecentTransactionsWidget transactions={transactions} />;
      case 'expenses-chart':
        return <ExpensesChartWidget transactions={transactions} />;
      case 'category-pie':
        return <CategoryPieWidget data={categoriesData} />;
      case 'balance-line':
        return <BalanceLineWidget transactions={transactions} initialBalance={solde} />;
      case 'budget-progress':
        return <BudgetProgressWidget categoriesData={categoriesData} />;
      default:
        return null;
    }
  };

  // Appliquer les variables CSS pour la grille
  useEffect(() => {
    if (isEditMode) {
      document.documentElement.style.setProperty('--columns', String(currentLayout.columns));
      document.documentElement.style.setProperty('--row-height', `${currentLayout.rowHeight}px`);
      document.documentElement.style.setProperty('--gap', `${currentLayout.gap}px`);
    }
  }, [isEditMode, currentLayout]);

  return (
    <>
      <div ref={containerRef} className={isEditMode ? 'select-none' : ''}>
        <GridLayout
          className={`layout ${isEditMode ? 'show-grid' : ''} transition-all duration-300`}
          layout={layout}
          cols={currentLayout.columns}
          rowHeight={currentLayout.rowHeight}
          width={containerWidth}
          containerPadding={[0, 0]}
          margin={[currentLayout.gap, currentLayout.gap]}
          onLayoutChange={handleLayoutChange}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          compactType={currentLayout.compactType}
          preventCollision={false}
          useCSSTransforms={true}
          draggableHandle=".drag-handle"
        >
          {widgets
            .filter((w) => w.isVisible)
            .map((widget) => {
              const isColliding = collisionWidgets.has(widget.id);

              return (
                <div
                  key={widget.id}
                  className={`relative transition-all ${
                    isEditMode
                      ? 'ring-2 ring-primary ring-offset-2 rounded-lg shadow-lg'
                      : ''
                  } ${widget.isLocked ? 'opacity-75' : ''} ${
                    isColliding ? 'collision-warning' : ''
                  }`}
                >
                  {isEditMode && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                      {widget.isLocked && (
                        <div className="bg-background/90 backdrop-blur-sm rounded-md p-1 border border-border">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-background/90 backdrop-blur-sm hover:bg-background"
                        onClick={() => setCustomizingWidget(widget)}
                      >
                        <Settings2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {isEditMode && !widget.isLocked && (
                    <div className="drag-handle absolute inset-0 cursor-move bg-primary/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg z-[5]">
                      <div className="bg-background/90 backdrop-blur-sm rounded-md px-3 py-2 border border-border pointer-events-none">
                        <p className="text-xs font-medium">
                          {isColliding ? '⚠️ Collision détectée' : '↔️ Glisser pour déplacer'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={isEditMode && !widget.isLocked ? 'pointer-events-none' : ''}>
                    {renderWidget(widget.id)}
                  </div>
                </div>
              );
            })}
        </GridLayout>
      </div>

      {customizingWidget && (
        <WidgetCustomizer
          widget={customizingWidget}
          open={!!customizingWidget}
          onOpenChange={(open) => !open && setCustomizingWidget(null)}
        />
      )}
    </>
  );
}
